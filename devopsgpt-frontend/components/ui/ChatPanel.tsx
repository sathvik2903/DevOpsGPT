"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import axios from "axios";

import {
  SendHorizonal,
  Bot,
  Sparkles
} from "lucide-react";

export default function ChatPanel({
  externalInput,
  setExternalInput
}: any) {

  const [messages, setMessages] =
    useState<any[]>([]);

  const [input, setInput] =
    useState(
      externalInput || ""
    );

  const [loading, setLoading] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (externalInput) {

      setInput(
        externalInput
      );

    }

  }, [externalInput]);

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth"
      });

  }, [messages, loading]);

  async function sendMessage() {

    if (!input.trim()) return;

    const userMessage = {

      role: "user",

      content: input

    };

    setMessages((prev) => [

      ...prev,

      userMessage

    ]);

    const currentInput = input;

    setInput("");

    if (setExternalInput) {

      setExternalInput("");

    }

    setLoading(true);

    try {

      const response =
        await axios.post(
          "process.env.NEXT_PUBLIC_API_URL/api/chat",
          {
            message:
              currentInput
          }
        );

      const aiMessage = {

        role: "ai",

        content:
          response.data.response
          || "No response"

      };

      setMessages((prev) => [

        ...prev,

        aiMessage

      ]);

    } catch (err) {

      console.error(err);

      setMessages((prev) => [

        ...prev,

        {
          role: "ai",

          content:
            "AI response failed"
        }

      ]);

    }

    setLoading(false);
  }

  function handleKeyDown(
    e: any
  ) {

    if (
      e.key === "Enter"
      && !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();

    }

  }

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl h-[700px] flex flex-col overflow-hidden">

      {/* HEADER */}

      <div className="border-b border-white/10 p-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-2xl">

            <Bot size={26} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">

              AI Assistant

            </h2>

            <p className="text-zinc-400 text-sm">

              Powered by DevOpsGPT Intelligence

            </p>

          </div>

        </div>

        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">

          <Sparkles size={16} />

          Online

        </div>

      </div>

      {/* CHAT AREA */}

      <div className="flex-1 overflow-auto p-6 space-y-5 scrollbar-hide">

        {

          messages.length === 0 && (

            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="bg-cyan-500/10 text-cyan-400 p-6 rounded-3xl mb-6">

                <Bot size={45} />

              </div>

              <h2 className="text-3xl font-bold mb-3">

                DevOpsGPT Assistant

              </h2>

              <p className="text-zinc-400 max-w-md leading-relaxed">

                Ask anything about Docker,
                Kubernetes, CI/CD, AWS,
                Linux deployment,
                DevOps architecture,
                cloud scaling, and more.

              </p>

            </div>

          )

        }

        {

          messages.map((msg, index) => (

            <div

              key={index}

              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div

                className={`max-w-[85%] p-5 rounded-3xl whitespace-pre-wrap leading-relaxed shadow-lg ${
                  msg.role === "user"
                    ? "bg-white text-black rounded-br-md"
                    : "bg-black border border-zinc-800 rounded-bl-md"
                }`}
              >

                {

                  msg.role === "ai" && (

                    <div className="flex items-center gap-2 mb-3 text-cyan-400 text-sm">

                      <Bot size={16} />

                      DevOpsGPT

                    </div>

                  )

                }

                {msg.content}

              </div>

            </div>

          ))

        }

        {

          loading && (

            <div className="flex justify-start">

              <div className="bg-black border border-zinc-800 rounded-3xl rounded-bl-md p-5">

                <div className="flex items-center gap-2 mb-3 text-cyan-400 text-sm">

                  <Bot size={16} />

                  DevOpsGPT

                </div>

                <div className="flex gap-2">

                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />

                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100" />

                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200" />

                </div>

              </div>

            </div>

          )

        }

        <div ref={messagesEndRef} />

      </div>

      {/* INPUT */}

      <div className="border-t border-white/10 p-5">

        <div className="flex items-end gap-4">

          <textarea
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask DevOpsGPT..."
            rows={2}
            className="flex-1 resize-none bg-black/80 border border-zinc-800 rounded-2xl p-4 outline-none focus:border-cyan-400 transition"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-white text-black p-4 rounded-2xl hover:scale-105 active:scale-95 transition disabled:opacity-50"
          >

            <SendHorizonal size={22} />

          </button>

        </div>

        <p className="text-zinc-500 text-xs mt-3">

          Press Enter to send • Shift + Enter for newline

        </p>

      </div>

    </div>

  );
}
