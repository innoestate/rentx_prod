import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 3600

def create_jwt_token(data: dict) -> str:
    payload = {
        "exp": datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS),
        "iat": datetime.utcnow(),
        "data": data
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> dict:
    try:
        print('secret', JWT_SECRET)
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get('data', payload)  # Return the entire payload if 'data' is not present
    except jwt.ExpiredSignatureError:
        print(f"JWT verification error: {str('Token has expired')}")
        raise Exception('Token has expired')
    except jwt.InvalidTokenError:
        print(f"JWT verification error: {str('Invalid token')}")
        raise Exception('Invalid token')
    except Exception as e:
        print(f"JWT verification error: {str(e)}")
        raise Exception('Error during JWT verification')
