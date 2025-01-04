from fastapi import FastAPI

app = FastAPI()

@app.get("/prospector/api/")
async def read_root():
    return {"Hello": "World"}