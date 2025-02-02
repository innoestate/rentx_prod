from fastapi import Request
from services.ai_service import extract_text
from data.data_fetcher import DataFetcher

async def extractProspection(request: Request):

    user_id = DataFetcher.get_user_id(request.state.user_data.get('email'))

    request_body = await request.json()
    document = request_body.get('document')
    link = request_body.get('link')
    jsonData = extract_text(user_id, document)
    jsonData['link'] = link
    return jsonData