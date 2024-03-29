import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

//react-redux
import React, { useState } from "react";
import { useSelector } from "react-redux";

//components
import Accordion from "../Accordion";
import TimeInputField from "../../TimeInputField";
import ScheduleOfTheDayModal from "./ScheduleOfTheDayModal";

//helper
import { datetimeToTime } from "~/helper/time";

dayjs.extend(LocalizedFormat);

const ScheduleOfTheDayForm = ({ className, isReadOnly }) => {
  const [isOpen, setIsOpen] = useState(false);

  //manage data from redux
  const data = useSelector((state) => state.productionReport.data);

  const scheduleForDay = data.scheduleForDay;
  const timeKeys = [
    "breakfastFrom",
    "breakfastTo",
    "crewCallFrom",
    "crewCallTo",
    "shootingCallFrom",
    "shootingCallTo",
    "lunchFrom",
    "lunchTo",
  ];
  const scheduleTimes = {};
  timeKeys.forEach((key) => {
    scheduleTimes[key] = scheduleForDay[key]
      ? datetimeToTime(scheduleForDay[key])
      : "";
  });
  const {
    breakfastFrom,
    breakfastTo,
    crewCallFrom,
    crewCallTo,
    shootingCallFrom,
    shootingCallTo,
    lunchFrom,
    lunchTo,
  } = scheduleTimes;

  //To get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  //To get current time make sure to use 24 hours format
  const currentTime = dayjs().format("LT");

  return (
    <>
      <Accordion
        tabIndex="-1"
        title="Schedule of The Day"
        defaultOpen={true}
        className={`text-base font-bold text-contrast-dark ${className}`}
      >
        <div
          onClick={() => {
            if (isReadOnly) return;
            setIsOpen(true);
          }}
        >
          <div className="flex justify-between border-b border-primary-base pb-2">
            <p className="text-base font-bold text-tertiary-dark">
              {currentDate}
            </p>
            <p className="text-base font-bold text-tertiary-dark">
              {currentTime}
            </p>
          </div>
          <div className="pt-2 text-base text-contrast-dark ">
            <div className="grid grid-cols-3 gap-4 pb-2 pt-4">
              <div></div>
              <p className="font-bold">Start</p>
              <p className="font-bold">End</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-4 gap-4 gap-y-3">
              <p className="font-bold">Breakfast</p>
              <TimeInputField
                tabIndex="-1"
                key={`breakfastFrom-${breakfastFrom ?? 0}`}
                label="breakfastFrom"
                defaultValue={breakfastFrom}
                isReadyOnly={true}
              />
              <TimeInputField
                tabIndex="-1"
                key={`breakfastTo-${breakfastTo ?? 0}`}
                label="breakfastTo"
                defaultValue={breakfastTo}
                isReadyOnly={true}
              />
              <p className="font-bold">Crew Call</p>
              <TimeInputField
                tabIndex="-1"
                key={`crewCallFrom-${crewCallFrom ?? 0}`}
                label="crewCallForm"
                defaultValue={crewCallFrom}
                isReadyOnly={true}
              />
              <TimeInputField
                tabIndex="-1"
                key={`crewCallTo-${crewCallTo ?? 0}`}
                label="crewCallTo"
                defaultValue={crewCallTo}
                isReadyOnly={true}
              />
              <p className="font-bold">Shooting Call</p>
              <TimeInputField
                tabIndex="-1"
                key={`shootingCallFrom-${shootingCallFrom ?? 0}`}
                label="shootingCallFrom"
                defaultValue={shootingCallFrom}
                isReadyOnly={true}
              />
              <TimeInputField
                tabIndex="-1"
                key={`shootingCallTo-${shootingCallTo ?? 0}`}
                label="shootingCallTo"
                defaultValue={shootingCallTo}
                isReadyOnly={true}
              />
              <p className="font-bold">Lunch</p>
              <TimeInputField
                tabIndex="-1"
                key={`lunchFrom-${lunchFrom ?? 0}`}
                label="lunchFrom"
                defaultValue={lunchFrom}
                isReadyOnly={true}
              />
              <TimeInputField
                tabIndex="-1"
                key={`lunchTo-${lunchTo ?? 0}`}
                label="lunchTo"
                defaultValue={lunchTo}
                isReadyOnly={true}
              />
            </div>
          </div>
        </div>
      </Accordion>

      <ScheduleOfTheDayModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ScheduleOfTheDayForm;
