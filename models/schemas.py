"""
Pydantic models / schemas for DevOpsGPT API
"""

from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class ProjectInfo(BaseModel):
    project_type: str = Field(..., description="Detected project type")
    language: str
    framework: Optional[str] = None
    package_manager: Optional[str] = None
    entry_point: Optional[str] = None
    port: int = 8000
    detected_files: List[str] = []
    confidence: float = Field(ge=0.0, le=1.0, default=0.8)
    metadata: Dict[str, Any] = {}


class AnalyzeResponse(BaseModel):
    success: bool
    project_info: ProjectInfo
    uploaded_files: List[str]
    message: str


class GenerateRequest(BaseModel):
    project_info: ProjectInfo
    app_name: str = "myapp"
    additional_context: Optional[str] = None


class GenerateAllRequest(BaseModel):
    project_info: ProjectInfo
    app_name: str = "myapp"
    additional_context: Optional[str] = None


class DockerfileResponse(BaseModel):
    success: bool
    content: str
    filename: str = "Dockerfile"
    explanation: str = ""


class CICDResponse(BaseModel):
    success: bool
    content: str
    filename: str = ".github/workflows/deploy.yml"
    explanation: str = ""


class KubernetesResponse(BaseModel):
    success: bool
    content: str
    filename: str = "k8s-manifests.yaml"
    explanation: str = ""


class AWSResponse(BaseModel):
    success: bool
    content: str
    steps: List[Dict[str, str]] = []
    explanation: str = ""


class LinuxResponse(BaseModel):
    success: bool
    content: str
    commands: List[str] = []
    explanation: str = ""


class GenerateAllResponse(BaseModel):
    success: bool
    dockerfile: DockerfileResponse
    cicd: CICDResponse
    kubernetes: KubernetesResponse
    aws: AWSResponse
    linux: LinuxResponse


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    project_context: Optional[ProjectInfo] = None


class ChatResponse(BaseModel):
    success: bool
    message: str
    role: str = "assistant"