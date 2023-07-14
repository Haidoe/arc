//react-redux
import React, { useState } from "react";
import { useSelector } from "react-redux";

//components
import Accordion from "../Accordion";
import TimeInputField from "../../TimeInputField";
import ScheduleOfTheDayModal from "./ScheduleOfTheDayModal";

//helper
import { datetimeToTime } from "~/helper/time";

const ScheduleOfTheDayForm = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  //manage data from redux
  const data = useSelector((state) => state.productionReport.data);

  const scheduleForDay = data.scheduleForDay;
  const timeKeys = ["breakfastFrom", "breakfastTo", "crewCallFrom", "crewCallTo", "shootingCallFrom", "shootingCallTo", "lunchFrom", "lunchTo"];
  const scheduleTimes = {};
  timeKeys.forEach((key) => {
    scheduleTimes[key] = scheduleForDay[key] ? datetimeToTime(scheduleForDay[key]) : "";
  });
  const { breakfastFrom, breakfastTo, crewCallFrom, crewCallTo, shootingCallFrom, shootingCallTo, lunchFrom, lunchTo } = scheduleTimes;

  //To get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return (
    <>
      <Accordion title="Schedule of The Day" defaultOpen={true} className={`text-contrast-dark text-base ${className}`}>
        <div onClick={() => setIsOpen(true)}>
          <div className="flex justify-between border-b border-primary-base pb-2">
            <p className="font-bold text-base text-tertiary-dark">
              {currentDate}
            </p>
          </div>
          <div className="pt-2 grid grid-cols-3 grid-rows-5 gap-4 gap-y-2">
            <div></div>
            <p className="font-bold">Start</p>
            <p className="font-bold">End</p>
            <p className="font-bold">Breakfast</p>
            <TimeInputField
              key={`breakfastFrom-${breakfastFrom ?? 0}`}
              label="breakfastFrom"
              defaultValue={breakfastFrom}
            />
            <TimeInputField
              key={`breakfastTo-${breakfastTo ?? 0}`}
              label="breakfastTo" defaultValue={breakfastTo} />
            <p className="font-bold">Crew Call</p>
            <TimeInputField
              key={`crewCallFrom-${crewCallFrom ?? 0}`}
              label="crewCallForm" defaultValue={crewCallFrom} />
            <TimeInputField
              key={`crewCallTo-${crewCallTo ?? 0}`}
              label="crewCallTo" defaultValue={crewCallTo} />
            <p className="font-bold">Shooting Call</p>
            <TimeInputField
              key={`shootingCallFrom-${shootingCallFrom ?? 0}`}
              label="shootingCallFrom" defaultValue={shootingCallFrom} />
            <TimeInputField
              key={`shootingCallTo-${shootingCallTo ?? 0}`}
              label="shootingCallTo" defaultValue={shootingCallTo} />
            <p className="font-bold">Lunch</p>
            <TimeInputField
              key={`lunchFrom-${lunchFrom ?? 0}`}
              label="lunchFrom" defaultValue={lunchFrom} />
            <TimeInputField
              key={`lunchTo-${lunchTo ?? 0}`}
              label="lunchTo" defaultValue={lunchTo} />
          </div>
        </div>
      </Accordion>

      <ScheduleOfTheDayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ScheduleOfTheDayForm;
