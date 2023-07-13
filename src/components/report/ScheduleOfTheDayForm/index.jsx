import React, { useState } from "react";
import Accordion from "../Accordion";
import { useSelector } from "react-redux";
import TimeInputField from "../../TimeInputField";
import { datetimeToTime } from "~/helper/time";
import ScheduleOfTheDayModal from "./ScheduleOfTheDayModal";
import AccordionModal from "../AccordionModal";

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
              label="breakfastFrom"
              value={breakfastFrom}
            />
            <TimeInputField label="breakfastTo" value={breakfastTo} />
            <p className="font-bold">Crew Call</p>
            <TimeInputField label="crewCallForm" value={crewCallFrom} />
            <TimeInputField label="crewCallTo" value={crewCallTo} />
            <p className="font-bold">Shooting Call</p>
            <TimeInputField label="shootingCallFrom" value={shootingCallFrom} />
            <TimeInputField label="shootingCallTo" value={shootingCallTo} />
            <p className="font-bold">Lunch</p>
            <TimeInputField label="lunchFrom" value={lunchFrom} />
            <TimeInputField label="lunchTo" value={lunchTo} />
          </div>
        </div>
      </Accordion>

      <ScheduleOfTheDayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ScheduleOfTheDayForm;
