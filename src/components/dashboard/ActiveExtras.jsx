// import percentage indicator
import PercentageChangeIndication from "~/components/dashboard/PercentageChangeIndication";

// ActiveExtras Dashboard Component
const ActiveExtras = ({}) => {
  
  const extrasCastInfo = [
    {
      qty: 3,
      name: "Poor New Yorkers in slum",
      notes: "All returning tomorrow",
      schedule: {
        in: "2023-07-02T22:00:00.000Z",
        out: "2023-07-02T22:00:00.000Z",
        meal: "2023-07-02T22:00:00.000Z",
        rate: 100,
      },
    },
    {
      qty: 2,
      name: "Bodyguards of the Senetor Pablo",
      notes: "Required in 5 scenes",
      schedule: {
        in: "2023-07-02T22:00:00.000Z",
        out: "2023-07-02T22:00:00.000Z",
        meal: "2023-07-02T22:00:00.000Z",
        rate: 150,
      },
    },
  ];

  const totalActiveExtras = extrasCastInfo.reduce((acc, val) => {
      return  acc + val.qty
  }, 0)

  console.log(totalActiveExtras)

  return (
    <>
      {
        <div className="items-bottom flex min-h-[90px] flex-1 flex-row gap-4 rounded bg-arc px-4 py-6 text-primary-light">
          {/* Display Information */}
          <div className="basis-5/8 flex w-60 flex-grow flex-col">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-primary-light">
                Active Extras
              </h3>
            </div>
            <div>
              <p className="text-sm">Active extras on set today.</p>
            </div>
          </div>
          {/* Display Computed Number */}
          <div className="basis-3/8 flex flex-row">
            <p className="self-end text-4xl font-bold leading-none text-primary-light">
              {totalActiveExtras}
            </p>
            <div className="ml-1 mb-[5px] self-end">
              <PercentageChangeIndication
                change={0}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ActiveExtras;
