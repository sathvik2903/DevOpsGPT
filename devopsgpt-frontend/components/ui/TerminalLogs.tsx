"use client";

export default function TerminalLogs({
  logs
}: any) {

  return (

    <div className="bg-black border border-zinc-800 rounded-3xl p-6 font-mono text-sm h-[260px] overflow-auto">

      <div className="flex items-center gap-2 mb-5">

        <div className="w-3 h-3 bg-red-500 rounded-full" />

        <div className="w-3 h-3 bg-yellow-500 rounded-full" />

        <div className="w-3 h-3 bg-green-500 rounded-full" />

      </div>

      <div className="space-y-3">

        {

          logs.map(
            (
              log: string,
              index: number
            ) => (

              <div
                key={index}
                className="text-green-400"
              >

                {log}

              </div>

            )
          )

        }

      </div>

    </div>

  );
}