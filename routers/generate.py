from fastapi import APIRouter

from pydantic import BaseModel

from services.claude_service import (
    generate_dockerfile,
    generate_cicd,
    generate_kubernetes,
    generate_aws,
    generate_linux
)

router = APIRouter()

# REQUEST MODELS

class ProjectInfo(BaseModel):

    language: str = "unknown"

    framework: str = "unknown"

    package_manager: str = "unknown"

    detected_files: list = []

class GenerateRequest(BaseModel):

    project_info: ProjectInfo

    app_name: str


# DOCKERFILE

@router.post("/generate/dockerfile")

async def dockerfile(
    request: GenerateRequest
):

    prompt = f"""

Generate a production-ready Dockerfile.

Language:
{request.project_info.language}

Framework:
{request.project_info.framework}

Package Manager:
{request.project_info.package_manager}

Files:
{request.project_info.detected_files}

"""

    result = generate_dockerfile(
        prompt
    )

    return {
        "content": result
    }


# CICD

@router.post("/generate/cicd")

async def cicd(
    request: GenerateRequest
):

    prompt = f"""

Generate GitHub Actions CI/CD pipeline.

Language:
{request.project_info.language}

Framework:
{request.project_info.framework}

"""

    result = generate_cicd(
        prompt
    )

    return {
        "content": result
    }


# KUBERNETES

@router.post("/generate/kubernetes")

async def kubernetes(
    request: GenerateRequest
):

    prompt = f"""

Generate Kubernetes manifests.

Language:
{request.project_info.language}

Framework:
{request.project_info.framework}

"""

    result = generate_kubernetes(
        prompt
    )

    return {
        "content": result
    }


# AWS

@router.post("/generate/aws")

async def aws(
    request: GenerateRequest
):

    prompt = f"""

Generate AWS deployment architecture.

Language:
{request.project_info.language}

Framework:
{request.project_info.framework}

"""

    result = generate_aws(
        prompt
    )

    return {
        "content": result
    }


# LINUX

@router.post("/generate/linux")

async def linux(
    request: GenerateRequest
):

    prompt = f"""

Generate Linux deployment commands.

Language:
{request.project_info.language}

Framework:
{request.project_info.framework}

"""

    result = generate_linux(
        prompt
    )

    return {
        "content": result
    }