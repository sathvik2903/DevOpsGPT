import cohere

co = cohere.Client(
    "aO28RpD2lrgCB6DLYIXYWuNXetIishEvcKRsXzB5"
)

def generate_response(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text


def generate_dockerfile(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text


def generate_cicd(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text


def generate_kubernetes(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text


def generate_aws(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text


def generate_linux(prompt: str):

    response = co.chat(
        model="command-a-03-2025",
        message=prompt
    )

    return response.text