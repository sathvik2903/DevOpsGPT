from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from services.repo_analyzer import (
    analyze_zip
)

import shutil

router = APIRouter()

@router.post("/analyze")

async def analyze_project(
    file: UploadFile = File(...)
):

    temp_path = f"temp_{file.filename}"

    with open(
        temp_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = analyze_zip(
        temp_path
    )

    return {
        "project_info": result
    }