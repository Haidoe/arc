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
    <section className="flex flex-1 flex-col gap-4 rounded-[5px] bg-arc">
      <header className="flex flex-col items-end gap-4">
        <p className="text-contrast-dark">30/100</p>
      </header>

      <div className="mt-0 flex flex-1 flex-col justify-center ">
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
        <Button className="py-2 text-xs bg-primary-light hover:bg-primary-base"> More </Button>
      </footer>
    </section>
  );
};

export default UnfinishhedSceneSection;
