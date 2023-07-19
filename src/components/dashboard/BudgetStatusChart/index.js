import { useEffect, useState } from "react";
import BudgetStatusChart from "./Chart";
import { useRouter } from "next/router";
import { getProductionFinishRate } from "~/service/dashboard";
import LoadingSpinner from "~/components/Loading";

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

  const [data, setdata] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductionFinishRate(productionId);

        setdata(response);
      } catch (error) {
        console.log("Finish rate error >> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-[5px] bg-arc p-8 ">
      <h2 className="flex items-end justify-between text-lg font-bold text-primary-base">
        Budget Status
        {data?.totalHours ? (
          <span className="text-sm font-normal text-black">
            {data.totalHours}/{data.totalDays * 12} hours
          </span>
        ) : (
          ""
        )}
      </h2>

      <div className="mt-4 flex justify-center">
        {isLoading ? (
          <LoadingDiv />
        ) : (
          <div className="min-w-[150px] max-w-[200px]">
            <BudgetStatusChart details={data} />
          </div>
        )}
      </div>

      {data?.finishRateAvg ? (
        <p className="mt-4 text-center text-xs text-black">
          {getStatusMessage(data.finishRateAvg)}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default BudgetStatusContent;
