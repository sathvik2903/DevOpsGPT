"""
Advanced Project Detector
"""

import os

from typing import (
    List,
    Dict,
    Any,
)

from models.schemas import (
    ProjectInfo
)


def detect_project(
    filenames: List[str],
    file_contents: Dict[str, str]
) -> ProjectInfo:

    filename_set = {
        os.path.basename(f).lower()
        for f in filenames
    }

    combined_content = "\n".join(
        file_contents.values()
    ).lower()

    # FASTAPI DETECTION
    if (
        "fastapi" in combined_content
        or "uvicorn" in combined_content
        or "from fastapi import" in combined_content
    ):

        return ProjectInfo(
            project_type="python-fastapi",
            language="python",
            framework="fastapi",
            package_manager="pip",
            entry_point="main.py",
            port=8000,
            detected_files=filenames,
            confidence=0.95,
        )

    # FLASK DETECTION
    if (
        "flask" in combined_content
        or "from flask import" in combined_content
    ):

        return ProjectInfo(
            project_type="python-flask",
            language="python",
            framework="flask",
            package_manager="pip",
            entry_point="app.py",
            port=5000,
            detected_files=filenames,
            confidence=0.95,
        )

    # NODE / EXPRESS
    if (
        "express" in combined_content
        or "require('express')" in combined_content
    ):

        return ProjectInfo(
            project_type="node-express",
            language="nodejs",
            framework="express",
            package_manager="npm",
            entry_point="index.js",
            port=3000,
            detected_files=filenames,
            confidence=0.95,
        )

    # PACKAGE.JSON
    if "package.json" in filename_set:

        return ProjectInfo(
            project_type="nodejs",
            language="nodejs",
            framework="node",
            package_manager="npm",
            entry_point="index.js",
            port=3000,
            detected_files=filenames,
            confidence=0.8,
        )

    # REQUIREMENTS.TXT
    if "requirements.txt" in filename_set:

        return ProjectInfo(
            project_type="python",
            language="python",
            framework="python",
            package_manager="pip",
            entry_point="main.py",
            port=8000,
            detected_files=filenames,
            confidence=0.8,
        )

    return ProjectInfo(
        project_type="unknown",
        language="unknown",
        framework="generic",
        package_manager="unknown",
        entry_point="main.py",
        port=8000,
        detected_files=filenames,
        confidence=0.4,
    )