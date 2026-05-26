import os
import zipfile
import shutil
from git import Repo

UPLOAD_DIR = "temp_projects"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

def analyze_project(
    project_path
):

    detected = {

        "language": "unknown",

        "framework": "unknown",

        "package_manager": "unknown",

        "entry_point": "unknown",

        "detected_files": []

    }

    for root, dirs, files in os.walk(project_path):

        for file in files:

            detected[
                "detected_files"
            ].append(file)

            # PYTHON

            if file == "requirements.txt":

                detected[
                    "language"
                ] = "python"

                detected[
                    "package_manager"
                ] = "pip"

            # NODE

            if file == "package.json":

                detected[
                    "language"
                ] = "javascript"

                detected[
                    "package_manager"
                ] = "npm"

            # NEXT.JS

            if (
                file == "next.config.js"
                or
                file == "next.config.mjs"
            ):

                detected[
                    "framework"
                ] = "nextjs"

            # REACT/VITE

            if (
                file == "vite.config.js"
                or
                file == "vite.config.ts"
            ):

                detected[
                    "framework"
                ] = "react"

            # FASTAPI

            if file == "main.py":

                detected[
                    "framework"
                ] = "fastapi"

                detected[
                    "entry_point"
                ] = "main.py"

            # DJANGO

            if file == "manage.py":

                detected[
                    "framework"
                ] = "django"

            # DOCKER

            if file == "Dockerfile":

                detected[
                    "dockerized"
                ] = True

            # K8S

            if (
                file.endswith(".yaml")
                or
                file.endswith(".yml")
            ):

                detected[
                    "kubernetes_possible"
                ] = True

    return detected


def analyze_zip(
    zip_path
):

    extract_path = os.path.join(
        UPLOAD_DIR,
        "uploaded_project"
    )

    if os.path.exists(
        extract_path
    ):

        shutil.rmtree(
            extract_path
        )

    with zipfile.ZipFile(
        zip_path,
        'r'
    ) as zip_ref:

        zip_ref.extractall(
            extract_path
        )

    return analyze_project(
        extract_path
    )


def analyze_github_repo(
    repo_url
):

    clone_path = os.path.join(
        UPLOAD_DIR,
        "github_project"
    )

    if os.path.exists(
        clone_path
    ):

        shutil.rmtree(
            clone_path
        )

    Repo.clone_from(
        repo_url,
        clone_path
    )

    return analyze_project(
        clone_path
    )