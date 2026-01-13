from fastapi import FastAPI
from app.api.v1.opportunities import router as opportunities_router
from app.api.v1.auth import router as auth_router

app = FastAPI(title="Oppify Backend")

app.include_router(opportunities_router, prefix="/api/v1/opportunities", tags=["Opportunities"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"status": "Backend running"}
