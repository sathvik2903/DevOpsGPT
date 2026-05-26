import { Bot } from "lucide-react";

export default function Navbar() {

  return (

    <div className="flex items-center justify-between mb-12">

      <div className="flex items-center gap-4">

        <div className="bg-white text-black p-4 rounded-2xl">

          <Bot size={35} />

        </div>

        <div>

          <h1 className="text-5xl font-bold">

            DevOpsGPT

          </h1>

          <p className="text-zinc-400">

            AI-Powered DevOps Platform

          </p>

        </div>

      </div>

    </div>

  );
}