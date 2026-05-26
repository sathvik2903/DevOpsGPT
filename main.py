from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    analyze,
    generate,
    chat,
    github
)

app = FastAPI(
    title="DevOpsGPT API"
)

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTERS

app.include_router(
    analyze.router,
    prefix="/api"
)

app.include_router(
    generate.router,
    prefix="/api"
)

app.include_router(
    chat.router,
    prefix="/api"
)

app.include_router(
    github.router,
    prefix="/api"
)

@app.get("/")

async def root():

    return {
        "message":
        "DevOpsGPT API Running"
    }