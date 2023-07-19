// // react imports
import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateShotScene } from "~/redux/features/ProductionReportSlice";

import { useRouter } from "next/router";

// import percentage indicator
import PercentageChangeIndication from "~/components/dashboard/PercentageChangeIndication";

// ActiveActors Dashboard Component
const ActiveActors = ({}) => {
  const router = useRouter();
  const { query } = router;

  // state for active actors of today and yesterday
  const [activeActors, setActiveActors] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  // if yesterday number was 200 and today number is 150 compute the increase or decrease in percentage
  const computePercentage = (yesterday, today) => {
    if (yesterday === 0) {
      return 100;
    }
    return Math.round(((today - yesterday) / yesterday) * 100);
  };

  // use api to get today's active actors

  const productionId = query.productionId;
  const GET_TODAY_ACTIVE_ACTORS = `/api/production/${productionId}/todays-active-actors?day=today`;
  const GET_YESTERDAY_ACTIVE_ACTORS = `/api/production/${productionId}/todays-active-actors?day=yesterday`;

  const getTodayActiveActors = async () => {
    // today active actors
    const resp_today = await fetch(GET_TODAY_ACTIVE_ACTORS);
    const result_today = await resp_today.json();

    // yesterday active actors
    const resp_yesterday = await fetch(GET_YESTERDAY_ACTIVE_ACTORS);
    const result_yesterday = await resp_yesterday.json();

    setActiveActors(result_today.activeActors);
    setPercentageChange(
      computePercentage(
        result_yesterday.activeActors,
        result_today.activeActors
      )
    );
  };

  getTodayActiveActors();

  return (
    <>
      {
        <div className="items-bottom flex min-h-[90px] flex-1 flex-row gap-4 rounded bg-arc px-4 py-4 text-primary-light">
          {/* Display Information */}
          <div className="basis-5/8 flex w-60 flex-grow flex-col">
            <div>
              <h3 className="text-xl font-bold text-primary-dark">
                Active Actors
              </h3>
            </div>
            <div>
              <p className="text-sm">Active actors on set today.</p>
            </div>
          </div>
          {/* Display Computed Number */}
          <div className="basis-3/8 flex flex-row">
            <p className="self-end text-4xl font-bold leading-none text-primary-dark">
              {activeActors}
            </p>
            <div className="ml-1 mb-[5px] self-end">
              <PercentageChangeIndication
                change={percentageChange}
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ActiveActors;
