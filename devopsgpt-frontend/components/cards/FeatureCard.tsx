export default function FeatureCard({
  icon,
  title,
  description,
}: any) {

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-white transition duration-300 hover:scale-[1.02]">

      <div className="mb-4">

        {icon}

      </div>

      <h2 className="text-2xl font-bold mb-3">

        {title}

      </h2>

      <p className="text-zinc-400">

        {description}

      </p>

    </div>

  );
}