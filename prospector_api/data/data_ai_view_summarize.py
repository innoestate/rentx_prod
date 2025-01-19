from data.data_fetcher import DataFetcher
from fastapi import HTTPException

async def addUserViewSummarize(user_id, summarize_long, summarize_short):
    return await DataFetcher.add_prospector_ai_view_summarize(user_id, summarize_long, summarize_short)

async def getLastUserViewSummarize(user_id):
    return await DataFetcher.get_last_prospector_ai_view_summarize(user_id)