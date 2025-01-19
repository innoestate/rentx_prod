from fastapi import Request
from services.ai_service import extract_text

async def extractProspection(request: Request):
    request_body = await request.json()
    document = request_body.get('document')
    link = request_body.get('link')
    jsonData = extract_text(document)
    jsonData['link'] = link
    return jsonData