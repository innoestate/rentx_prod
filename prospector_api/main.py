from fastapi import FastAPI, Request, Depends
from middleware import jwt_middleware

app = FastAPI()

@app.get("/prospector/api/")
async def read_root():
    return {"Hello": "World"}

@app.get("/prospector/api/add")
async def add_item(request: Request, _ = Depends(jwt_middleware)):
    return {"status": "success"}
