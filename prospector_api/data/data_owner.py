from data.data_fetcher import DataFetcher

async def getOwner(owner_id):
    return await DataFetcher.fetch_owner_by_id(owner_id)

async def getFirstOwner(user_id):
    return await DataFetcher.fetch_first_owner_by_user_id(user_id)
