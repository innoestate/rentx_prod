from data.data_fetcher import DataFetcher

async def addSeller(user_id, prospection):
    seller_data = {
        'user_id': user_id,
        'name': prospection.get('seller_name'),
        'phone': prospection.get('seller_phone'),
        'email': prospection.get('seller_mail'),
        'address': prospection.get('address'),
        'agency': prospection.get('seler_agency_name')
    }   
    return await DataFetcher.add_seller(seller_data)

async def getSeller(seller_id):
    return await DataFetcher.fetch_seller_by_id(seller_id)