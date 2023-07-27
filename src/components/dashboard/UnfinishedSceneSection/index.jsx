import Button from "~/components/Button";

const UnfinishhedSceneSection = ({}) => {
  const data = [
    {
      id: 1,
      title: "Scene 1",
      description: "Unforseen Weather Conditions",
    },
    {
      id: 2,
      title: "Scene 2",
      description: "Lost Lead Actor",
    },
    {
      id: 3,
      title: "Scene 3",
      description: "Set Design Disaster",
    },
    {
      id: 4,
      title: "Scene 4",
      description: "Location Lockdown",
    },
  ];

  return (
    <section className="flex flex-1 flex-col gap-4 rounded-[5px] bg-arc p-8">
      <header className="flex items-end justify-between gap-4">
        <h2 className="text-lg font-bold text-primary-base">
          Unfinished Scenes
        </h2>

        <p>30/100</p>
      </header>

      <div className="mt-4 flex flex-1 flex-col justify-center ">
        <div className="flex  flex-col p-6 pb-0 shadow-[inset_0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex max-h-[250px] flex-1 flex-col gap-3 overflow-y-auto pb-4">
            {data.map((item) => (
              <p key={item.id} className="w-full rounded bg-[#D9D9D9] p-2">
                <span className="font-bold">{item.title}: </span>
                {item.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      <footer className="flex justify-center">
        <Button className="py-2 text-xs"> More </Button>
      </footer>
    </section>
  );
};

export default UnfinishhedSceneSection;
