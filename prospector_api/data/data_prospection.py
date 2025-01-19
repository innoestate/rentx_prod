from data.data_fetcher import DataFetcher
import aiohttp
import os
from dotenv import load_dotenv

api_endpoint = os.getenv('RENTX_API_URL') + "/prospections"


load_dotenv()

async def addProspection(document, barer_token):
    # Parse the document to extract the necessary fields
    prospection_data = {
        'city': document.get('city'),
        'address': '',
        'link': document.get('link', None),
        'seller_id': document.get('seller_id', None),
        'user_id': document.get('user_id'),
        'price': document.get('price'),
        'resume': document.get('description', ''),
        'emission_date': '2025-01-07T18:27:37+01:00',
        'offer_id': None,
        'construction_cost': None,
        'rents': None,
        'comment': None
    }

    # Set default values for required fields if they are None
    prospection_data['city'] = prospection_data.get('city', '')
    prospection_data['address'] = prospection_data.get('address', '')
    prospection_data['price'] = prospection_data.get('price', 0)

    # Define the API endpoint using RENTX_API_URL from the environment variables

    # Define the JWT authorization header
    headers = {
            "Authorization": barer_token, # Replace YOUR_ACCESS_TOKEN with your actual token
            "Content-Type": "application/json",  # Optional, depending on your API requirements
        }

    print('hreaders', headers)

    # Make an asynchronous POST request to send the prospection data
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(api_endpoint, json=prospection_data, headers=headers) as response:
                if response.status == 200:
                    print("Prospection data sent successfully.")
                else:
                    print(f"Failed to send prospection data. Status code: {response.status}")

                response_data = await response.json()
                return response_data

    except aiohttp.ClientError as e:
        print(f"An error occurred: {e}")

    return None
    # Pass the parsed data to DataFetcher.add_prospection
    # await DataFetcher.add_prospection(prospection_data)


async def getProspection(prospection_id):
    return await DataFetcher.get_prospection(prospection_id)
