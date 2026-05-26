"use client";

import {
  History
} from "lucide-react";

export default function Sidebar({
  history,
  setOutputs
}: any) {

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 h-fit sticky top-6">

      <div className="flex items-center gap-3 mb-6">

        <History size={18} />

        <h2 className="text-lg font-bold">

          History

        </h2>

      </div>

      <div className="space-y-3">

        {

          history.map((item: any, index: number) => (

            <button

              key={index}

              onClick={() =>
                setOutputs(item.outputs)
              }

              className="w-full text-left bg-black/60 border border-zinc-800 rounded-2xl p-4 hover:border-cyan-400 transition"
            >

              <p className="font-semibold text-sm">

                Generation #

                {history.length - index}

              </p>

              <p className="text-zinc-500 text-xs mt-1">

                {item.time}

              </p>

            </button>

          ))

        }

      </div>

    </div>

  );
}