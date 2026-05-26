"use client";

import axios from "axios";

import { useState } from "react";

import {
  Box,
  Cpu,
  Cloud,
  Terminal,
  GitBranch,
  Upload,
  Copy,
  Download,
} from "lucide-react";

import toast, {
  Toaster
} from "react-hot-toast";

import Navbar from "@/components/layout/Navbar";

import Sidebar from "@/components/layout/Sidebar";

import FeatureCard from "@/components/cards/FeatureCard";

import Tabs from "@/components/ui/Tabs";

import CodeBlock from "@/components/ui/CodeBlock";

import LoadingScreen from "@/components/ui/LoadingScreen";

import ChatPanel from "@/components/ui/ChatPanel";

import SuggestionPanel from "@/components/ui/SuggestionPanel";

import TerminalLogs
from "@/components/ui/TerminalLogs";

import StackInfo
from "@/components/ui/StackInfo";

export default function Home() {

  const [activeTab, setActiveTab] =
    useState("docker");

  const [loading, setLoading] =
    useState(false);

  const [repoUrl, setRepoUrl] =
    useState("");

  const [
    suggestionInput,
    setSuggestionInput
  ] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [history, setHistory] =
    useState<any[]>([]);

  const [logs, setLogs] =
    useState<string[]>([]);

  const [stackInfo, setStackInfo] =
    useState<any>(null);

  const [outputs, setOutputs] =
    useState<any>({
      docker: "",
      cicd: "",
      k8s: "",
      aws: "",
      linux: "",
    });

  async function generateAll() {

    if (!repoUrl && !selectedFile) {

      toast.error(
        "Upload ZIP or paste GitHub URL"
      );

      return;
    }

    setLoading(true);

    setLogs([
      "[✓] Starting AI analysis..."
    ]);

    try {

      let projectInfo;

      // GITHUB ANALYSIS

      if (repoUrl) {

        toast.loading(
          "Analyzing GitHub Repository...",
          {
            id: "analyze"
          }
        );

        setLogs((prev) => [

          ...prev,

          "[✓] Cloning GitHub repository..."

        ]);

        const githubRes =
          await axios.post(
            "process.env.NEXT_PUBLIC_API_URL/api/github-analyze",
            {
              repo_url:
                repoUrl
            }
          );

        projectInfo =
          githubRes.data.project_info;

      }

      // ZIP ANALYSIS

      else {

        toast.loading(
          "Analyzing ZIP Project...",
          {
            id: "analyze"
          }
        );

        setLogs((prev) => [

          ...prev,

          "[✓] Extracting ZIP project..."

        ]);

        const formData =
          new FormData();

        formData.append(
          "file",
          selectedFile as Blob
        );

        const analyzeRes =
          await axios.post(
            "process.env.NEXT_PUBLIC_API_URL/api/analyze",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        projectInfo =
          analyzeRes.data.project_info;

      }

      setStackInfo(projectInfo);

      setLogs((prev) => [

        ...prev,

        `[✓] Framework detected: ${projectInfo.framework}`,

        `[✓] Language detected: ${projectInfo.language}`,

        `[✓] Package manager: ${projectInfo.package_manager}`,

        "[✓] Generating Dockerfile...",

        "[✓] Generating CI/CD pipeline...",

        "[✓] Generating Kubernetes manifests...",

        "[✓] Generating AWS architecture...",

        "[✓] Generating Linux deployment scripts..."

      ]);

      toast.loading(
        "Generating DevOps Infrastructure...",
        {
          id: "analyze"
        }
      );

      const requestBody = {

        project_info:
          projectInfo,

        app_name:
          "devopsgpt"

      };

      const [
        dockerRes,
        cicdRes,
        k8sRes,
        awsRes,
        linuxRes
      ] = await Promise.all([

        axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/generate/dockerfile",
          requestBody
        ),

        axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/generate/cicd",
          requestBody
        ),

        axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/generate/kubernetes",
          requestBody
        ),

        axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/generate/aws",
          requestBody
        ),

        axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/generate/linux",
          requestBody
        ),

      ]);

      const generatedOutputs = {

        docker:
          dockerRes.data.content,

        cicd:
          cicdRes.data.content,

        k8s:
          k8sRes.data.content,

        aws:
          awsRes.data.content,

        linux:
          linuxRes.data.content,

      };

      setOutputs(
        generatedOutputs
      );

      setHistory((prev) => [

        {
          time:
            new Date().toLocaleTimeString(),

          outputs:
            generatedOutputs

        },

        ...prev

      ]);

      setLogs((prev) => [

        ...prev,

        "[✓] Infrastructure generation complete."

      ]);

      toast.success(
        "Infrastructure Generated Successfully",
        {
          id: "analyze"
        }
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Generation Failed",
        {
          id: "analyze"
        }
      );

    }

    setLoading(false);
  }

  function copyText(
    text: string
  ) {

    navigator.clipboard.writeText(
      text
    );

    toast.success(
      "Copied"
    );
  }

  function downloadFile(
    filename: string,
    content: string
  ) {

    const blob = new Blob(
      [content],
      {
        type: "text/plain"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    toast.success(
      "Downloaded"
    );
  }

  const tabs = [

    {
      key: "docker",
      label: "Docker",
      icon: <Box size={18} />
    },

    {
      key: "cicd",
      label: "CI/CD",
      icon: <Cpu size={18} />
    },

    {
      key: "k8s",
      label: "Kubernetes",
      icon: <Cloud size={18} />
    },

    {
      key: "aws",
      label: "AWS",
      icon: <Cloud size={18} />
    },

    {
      key: "linux",
      label: "Linux",
      icon: <Terminal size={18} />
    },

  ];

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      <Toaster />

      {

        loading && <LoadingScreen />

      }

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

      <div className="relative z-10 p-6">

        <Navbar />

        <div className="grid xl:grid-cols-[220px_1fr_380px] gap-8">

          {/* LEFT SIDEBAR */}

          <Sidebar
            history={history}
            setOutputs={setOutputs}
          />

          {/* MAIN CONTENT */}

          <div>

            {/* FEATURES */}

            <div className="grid md:grid-cols-4 gap-5 mb-10">

              <FeatureCard
                icon={<Box size={35} />}
                title="Docker"
                description="Production Dockerfiles"
              />

              <FeatureCard
                icon={<Cpu size={35} />}
                title="CI/CD"
                description="Deployment pipelines"
              />

              <FeatureCard
                icon={<Cloud size={35} />}
                title="Kubernetes"
                description="K8s manifests"
              />

              <FeatureCard
                icon={<Terminal size={35} />}
                title="Linux"
                description="Deployment commands"
              />

            </div>

            {/* TERMINAL + STACK */}

            <div className="grid lg:grid-cols-2 gap-8 mb-10">

              <TerminalLogs logs={logs} />

              <StackInfo info={stackInfo} />

            </div>

            {/* INPUT CARD */}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10">

              <div className="flex items-center gap-3 mb-4">

                <GitBranch />

                <input
                  type="text"
                  placeholder="Paste GitHub Repository URL"
                  value={repoUrl}
                  onChange={(e) =>
                    setRepoUrl(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/70 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-cyan-400 transition"
                />

              </div>

              <div className="flex items-center gap-3 mb-6">

                <Upload />

                <input
                  type="file"
                  accept=".zip,.py,.js,.ts"
                  onChange={(e) => {

                    if (
                      e.target.files?.[0]
                    ) {

                      setSelectedFile(
                        e.target.files[0]
                      );

                    }

                  }}
                />

              </div>

              <button
                onClick={generateAll}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition"
              >

                Generate Full DevOps Stack

              </button>

              {/* DEMO BUTTONS */}

              <div className="flex flex-wrap gap-4 mt-6">

                <button
                  onClick={() =>
                    setRepoUrl(
                      "https://github.com/vercel/next.js"
                    )
                  }
                  className="bg-black/60 border border-zinc-800 px-4 py-2 rounded-xl hover:border-cyan-400 transition"
                >

                  Try Next.js Demo

                </button>

                <button
                  onClick={() =>
                    setRepoUrl(
                      "https://github.com/tiangolo/fastapi"
                    )
                  }
                  className="bg-black/60 border border-zinc-800 px-4 py-2 rounded-xl hover:border-cyan-400 transition"
                >

                  Try FastAPI Demo

                </button>

              </div>

            </div>

            {/* TABS */}

            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* OUTPUT */}

            {

              outputs[activeTab] && (

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">

                  <div className="flex justify-between items-center px-8 py-6 border-b border-white/10">

                    <h2 className="text-3xl font-bold">

                      {
                        activeTab.toUpperCase()
                      }

                    </h2>

                    <div className="flex gap-4">

                      <button

                        onClick={() =>
                          copyText(
                            outputs[
                              activeTab
                            ]
                          )
                        }

                        className="bg-black/70 border border-zinc-800 p-3 rounded-2xl hover:border-cyan-400 transition"
                      >

                        <Copy size={20} />

                      </button>

                      <button

                        onClick={() =>
                          downloadFile(
                            activeTab === "docker"
                              ? "Dockerfile"
                              : activeTab === "cicd"
                              ? "github-actions.yml"
                              : activeTab === "k8s"
                              ? "deployment.yaml"
                              : activeTab === "aws"
                              ? "aws-architecture.txt"
                              : "deploy.sh",
                            outputs[
                              activeTab
                            ]
                          )
                        }

                        className="bg-black/70 border border-zinc-800 p-3 rounded-2xl hover:border-cyan-400 transition"
                      >

                        <Download size={20} />

                      </button>

                    </div>

                  </div>

                  <CodeBlock
                    code={
                      outputs[
                        activeTab
                      ]
                    }
                  />

                </div>

              )

            }

          </div>

          {/* RIGHT AI PANEL */}

          <div className="space-y-6 sticky top-6 h-fit">

            <SuggestionPanel
              setInput={setSuggestionInput}
            />

            <ChatPanel
              externalInput={suggestionInput}
              setExternalInput={setSuggestionInput}
            />

          </div>

        </div>

      </div>

    </main>
  );
}
