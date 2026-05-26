"use client";

import {
  Sparkles,
  Rocket,
  Shield,
  Cloud,
  Cpu
} from "lucide-react";

const suggestions = [

  {
    icon: <Rocket size={20} />,

    title:
      "Production Deployment",

    prompt:
      "How do I deploy this project in production?"
  },

  {
    icon: <Cloud size={20} />,

    title:
      "AWS Optimization",

    prompt:
      "Suggest the best AWS architecture for scalability."
  },

  {
    icon: <Shield size={20} />,

    title:
      "Security Improvements",

    prompt:
      "How can I improve Docker and Kubernetes security?"
  },

  {
    icon: <Cpu size={20} />,

    title:
      "CI/CD Enhancements",

    prompt:
      "How can I optimize CI/CD pipeline performance?"
  },

  {
    icon: <Sparkles size={20} />,

    title:
      "AI Recommendations",

    prompt:
      "Suggest modern DevOps best practices for this stack."
  },

];

export default function SuggestionPanel({
  setInput
}: any) {

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <div className="flex items-center gap-3 mb-6">

        <Sparkles className="text-cyan-400" />

        <h2 className="text-2xl font-bold">

          AI Suggestions

        </h2>

      </div>

      <div className="space-y-4">

        {

          suggestions.map((item, index) => (

            <button

              key={index}

              onClick={() =>
                setInput(
                  item.prompt
                )
              }

              className="w-full text-left bg-black/60 border border-zinc-800 hover:border-cyan-400 rounded-2xl p-5 transition duration-300 hover:scale-[1.02]"
            >

              <div className="flex items-start gap-4">

                <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-2xl">

                  {item.icon}

                </div>

                <div>

                  <h3 className="font-bold text-lg mb-1">

                    {item.title}

                  </h3>

                  <p className="text-zinc-400 text-sm">

                    {item.prompt}

                  </p>

                </div>

              </div>

            </button>

          ))

        }

      </div>

    </div>

  );
}