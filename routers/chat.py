from fastapi import APIRouter

from pydantic import BaseModel

from services.claude_service import generate_response

router = APIRouter()

class ChatRequest(BaseModel):

    message: str

@router.post("/chat")

async def chat(
    request: ChatRequest
):

    response = generate_response(
        request.message
    )

    return {
        "response": response
    }