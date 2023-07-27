// react essentials
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// api
import { getProductionFinishRate } from "~/service/dashboard";

// components
import LoadingSpinner from "~/components/Loading";
import BudgetStatusChart from "./Chart";
import DropDown from "~/components/global/DropDown";

// constants
const STATUS = {
  good: "The shooting is on track to finish on time.",
  warning: "The shooting's progress is slower than expected.",
  danger: "The shooting is severely behind schedule. Urgent action is required",
};

const LoadingDiv = () => (
  <div className="flex h-[200px] flex-col items-center justify-center">
    <LoadingSpinner size={40} />
    <span className="text-primary-light">Retrieving data...</span>
  </div>
);

const getStatusMessage = (rate) => {
  if (rate <= 80) {
    return STATUS.good;
  } else if (rate <= 100) {
    return STATUS.warning;
  } else {
    return STATUS.danger;
  }
};

const BudgetStatusContent = () => {
  const router = useRouter();
  const { productionId } = router.query;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("bingo")
    const fetchData = async () => {
      try {
        const response = await getProductionFinishRate(productionId);
        console.log(response)
        setData(response);
      } catch (error) {
        console.log("Finish rate error >> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const computeDates = [{ name: "Today" }, { name: "Yesterday" }]
  

  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-[5px] flex-wrap bg-arc justify-between items-center">

      <div className="left-segement flex-1 flex flex-col gap-9 md:w-[50%]">
        <p className="mt-4 text-center md:text-left text-xl text-black ">
          {getStatusMessage(data?.finishRateAvg)}
        </p>

        <div className="flex flex-col items-left">
          <p>Production Progress by</p>
          {/* Dropdown list */}
          <DropDown
            people={computeDates}
            selected={{ name: "Today" }}
            width="medium"
          />
        </div>
      </div>

      <div className="right-segment flex-1 flex flex-col  align-middle gap-9 md:w-[50%]">

      {isLoading ? (
          <LoadingDiv />
        ) : (
          <div className="flex justify-center">
            <BudgetStatusChart details={data} />
          </div>
        )}

      </div>

    </div>
  );
};

export default BudgetStatusContent;
