"use client";

export default function StackInfo({
  info
}: any) {

  if (!info) return null;

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Detected Stack

      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4">

          <p className="text-zinc-500 text-sm">

            Language

          </p>

          <h3 className="text-xl font-bold mt-1">

            {info.language}

          </h3>

        </div>

        <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4">

          <p className="text-zinc-500 text-sm">

            Framework

          </p>

          <h3 className="text-xl font-bold mt-1">

            {info.framework}

          </h3>

        </div>

        <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4">

          <p className="text-zinc-500 text-sm">

            Package Manager

          </p>

          <h3 className="text-xl font-bold mt-1">

            {info.package_manager}

          </h3>

        </div>

        <div className="bg-black/50 border border-zinc-800 rounded-2xl p-4">

          <p className="text-zinc-500 text-sm">

            Entry Point

          </p>

          <h3 className="text-xl font-bold mt-1">

            {info.entry_point}

          </h3>

        </div>

      </div>

    </div>

  );
}