from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.responses import StreamingResponse
from middleware import jwt_middleware
from fastapi.middleware.cors import CORSMiddleware
from data.data_fetcher import DataFetcher
from data.data_prospection import addProspection, getProspection
from services.prospections_service import extractProspection
from data.data_seller import addSeller, getSeller
from data.data_ai_view_history import addViewMessageInHistory
from data.data_owner import getOwner, getFirstOwner
from services.ai_service import summarizeUserView, generateOffer
from data.data_ai_view_summarize import addUserViewSummarize, getLastUserViewSummarize
import json
from pydantic import BaseModel
from typing import Optional
from services.pdf_service import create_pdf
from services.html_service import setHeader
from services.html_service import addBuyerSignature
from services.offer_service import callAddOfferRentxApi
from data.data_ai_view_summarize import resetUserViewSummarize
from services.tokens_service import getUserTokens

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/prospector/api/")
async def read_root():
    return {"Hello": "World"}

@app.post("/prospector/api/add")
async def add_Estate(request: Request, _ = Depends(jwt_middleware)):

    barer_token = request.headers.get('Authorization')

    try:
        request_body = await request.json()
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in request body")
    if not request_body:
        raise HTTPException(status_code=400, detail="Request body cannot be empty")

    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
    prospection = await extractProspection(request)
    prospection['user_id'] = user_id

    seller = await addSeller(user_id, prospection)

    if seller and seller['id']:
        prospection['seller_id'] = seller['id']

    await addProspection(prospection, barer_token)


    return {"status": "success", "body": 'ok'}

@app.post("/prospector/api/ai/configuration")
async def ai_configuration(request: Request, _ = Depends(jwt_middleware)):

    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
    try:
        request_body = await request.json()
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in request body")
    if not request_body:
        raise HTTPException(status_code=400, detail="Request body cannot be empty")
    if request_body.get('prompt') is None:
        raise HTTPException(status_code=400, detail="missing prompt")

    userPrompt = request_body.get('prompt')
    message = await addViewMessageInHistory(user_id, userPrompt)
    lastSummarize = await getLastUserViewSummarize(user_id)
    if lastSummarize is not None and lastSummarize[2] is not None:
        summaries = summarizeUserView(user_id, message, lastSummarize[2])
        await addUserViewSummarize(user_id, summaries['summarize_long'], summaries['summarize_short'])
    else:
        summarizeUserView(message, '')
        await addUserViewSummarize(user_id, '', '')

    return {"status": "success", "body": message}

@app.get("/prospector/api/ai/configuration")
async def get_ai_configuration(request: Request, _ = Depends(jwt_middleware)):
    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
    last_summarize = await getLastUserViewSummarize(user_id)
    if last_summarize:
        summarize_short, summarize_long = last_summarize[2], last_summarize[3]
        return {"summarize_short": summarize_short, "summarize_long": summarize_long}
    else:
        raise HTTPException(status_code=404, detail="No summaries found for the user.")

@app.get("/prospector/api/ai/configuration/reset")
async def reset_ai_configuration(request: Request, _ = Depends(jwt_middleware)):
    print('reset ai configuration')
    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
    result = await resetUserViewSummarize(user_id)
    if result:
        return {"summarize_short": '', "summarize_long": ''}
    else:
        raise HTTPException(status_code=404, detail="No summaries found for the user.")

@app.post("/prospector/api/ai/generate_offer")
async def generate_offer(request: Request, _ = Depends(jwt_middleware)):
    try:

        barer_token = request.headers.get('Authorization')

        user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
        request_body = await request.json()

        prospection_id = request_body.get('prospection_id')
        owner_id = request_body.get('owner_id')
        priceWanted = request_body.get('price')
        instructions = request_body.get('instructions')


        if not owner_id:
            owner = await getFirstOwner(user_id)
        else:
            owner = await getOwner(owner_id)

        prospection_details = await getProspection(prospection_id)
        seller_id = prospection_details.get('seller_id')
        seller = await getSeller(seller_id)
        userSummarize = await getLastUserViewSummarize(user_id)
        offerHtml = generateOffer(user_id, owner, prospection_details, userSummarize[2], priceWanted, instructions)
        if not prospection_details:
            raise HTTPException(status_code=404, detail="Prospection not found")

        offerHtml = setHeader(offerHtml, owner, seller)

        # Add buyer's signature to the offer HTML if available
        signature_base64 = owner.get('signature')
        if signature_base64:
            offerHtml = addBuyerSignature(offerHtml, owner, signature_base64)

        pdf = create_pdf(offerHtml)
        
        try:
            await callAddOfferRentxApi(barer_token, priceWanted, prospection_id, pdf)
        except Exception as e:
            print(f"An error occurred adding offer to rentx api: {e}")

        response = StreamingResponse(pdf, media_type="application/pdf")
        response.headers["Content-Disposition"] = "attachment; filename=generated.pdf"
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/prospector/api/ai/tokens")
async def get_user_tokens(request: Request, _ = Depends(jwt_middleware)):
    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))
    tokens = getUserTokens(user_id)
    return {"tokens": tokens}
