export default function Tabs({
  tabs,
  activeTab,
  setActiveTab
}: any) {

  return (

    <div className="flex gap-4 flex-wrap mb-8">

      {

        tabs.map((tab: any) => (

          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key)
            }
            className={`px-5 py-3 rounded-2xl flex items-center gap-2 transition ${
              activeTab === tab.key
                ? "bg-white text-black"
                : "bg-zinc-900 border border-zinc-800 hover:border-white"
            }`}
          >

            {tab.icon}

            {tab.label}

          </button>

        ))

      }

    </div>

  );
}