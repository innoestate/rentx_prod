from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from auth import verify_jwt_token

security = HTTPBearer()

async def jwt_middleware(request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = str(credentials.credentials)
    try:
        data = verify_jwt_token(token)
        request.state.user_data = data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
