from data.data_fetcher import DataFetcher
from fastapi import HTTPException

async def addViewMessageInHistory(user_id, promptData):
    # Parse the promptData to extract the necessary fields
    if not user_id:
        raise HTTPException(status_code=400, detail="need user_id")
    if not promptData.get('content'):
        raise HTTPException(status_code=400, detail="need content")

    prompt_data = {
        'user_id': user_id,
        'model': promptData.get('model', ''),
        'role': promptData.get('role', 'user'),
        'content': promptData.get('content', ''),
    }
    # Pass the parsed data to DataFetcher.add_ai_view_message_in_history
    return await DataFetcher.add_ai_view_message_in_history(prompt_data)