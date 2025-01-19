import os
import aiohttp
from io import BytesIO
import base64

api_endpoint = os.getenv('RENTX_API_URL') + "/prospections/offers"


async def callAddOfferRentxApi(barer_token, price, prospection_id, file):
    # Construct the URL with query parameters
    url_with_params = f"{api_endpoint}/add?price={price}&prospection_id={prospection_id}"

    # Set headers without JSON content type since we're sending bytes
    headers = {
        "Content-Type": "application/pdf",
        "Authorization": barer_token,
    }

    print('sending offer data to rentx api', prospection_id, price)
    try:
        response = None  # Initialize response variable
        async with aiohttp.ClientSession() as session:
            async with session.post(url_with_params, data=file.getvalue(), headers=headers) as response:
                if response.status == 200:
                    print("offer data sent successfully.")
                else:
                    print(f"Failed to send prospection data. Status code: {response.status}")

                response_data = await response.json()
                return response_data
    except Exception as e:
        print(f"An error occurred: {e}")

    return response.json() if response else None
