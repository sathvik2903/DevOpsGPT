from fastapi import APIRouter

from pydantic import BaseModel

from services.repo_analyzer import (
    analyze_github_repo
)

router = APIRouter()

class RepoRequest(
    BaseModel
):

    repo_url: str

@router.post("/github-analyze")

async def github_analyze(
    request: RepoRequest
):

    result = analyze_github_repo(
        request.repo_url
    )

    return {
        "project_info": result
    }