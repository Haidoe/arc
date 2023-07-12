import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TimeInputField from "../TimeInputField";
// import convertToISO from "~/helper/convertToISO";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Vancouver");

const ScheduleOfTheDayForm = ({ className }) => {
  const report = useSelector((state) => state.productionReport);
  const breakfastFrom = report?.data?.scheduleForDay?.breakfastFrom || null;
  console.log("breakfast from: " + breakfastFrom);

  const convertToISO = (timeString) => {
    const date = dayjs(timeString).tz("America/Vancouver").format("ll");
    const time = dayjs(timeString).tz("America/Vancouver").format("HH:mm");
    console.log("date: " + date);
    console.log("time: " + time);
    return { date, time };
  };

  // const breakfastFromRef = useRef(
  //   convertToISO(breakfastFrom).time
  // );

  // console.log("After conversion: " + breakfastFromRef.current);

  // useEffect(() => {
  //   breakfastFromRef.current = breakfastFromRef.current;
  // }, []);

  // const handleBreakfastTimeChange = (e) => {
  //   breakfastFromRef.current = e.target.value;
  //   console.log("breakfastFromRef.current: " + breakfastFromRef.current);
  // };

  // const breakfastFromRef = useRef(null);
  // const [breakfastFromValue, setBreakfastFromValue] = useState(
  //   convertToISO(breakfastFrom).time
  // );

  // console.log("After conversion: " + breakfastFromValue);

  // useEffect(() => {
  //   breakfastFromRef.current = breakfastFromValue;
  // }, [breakfastFromValue]);

  // const handleBreakfastTimeChange = (e) => {
  //   const newTime = e.target.value;
  //   setBreakfastFromValue(newTime);
  //   console.log("breakfastFromRef.current: " + newTime);
  // };

  const breakfastFromRef = useRef(null);
  const [breakfastFromValue, setBreakfastFromValue] = useState(
    convertToISO(breakfastFrom).time
  );

  console.log("After conversion: " + breakfastFromValue);

  useEffect(() => {
    setBreakfastFromValue(convertToISO(breakfastFrom).time);
  }, [breakfastFrom]);

  const handleBreakfastTimeChange = (e) => {
    const newTime = e.target.value;
    setBreakfastFromValue(newTime);
    console.log("breakfastFromValue: " + newTime);
  };

  return (
    <form action="" className={`text-contrast-dark text-base ${className}`}>
      <div className="flex justify-between border-b border-primary-base pb-2">
        <p className="font-bold text-base text-tertiary-dark">
          Tue Jun 27, 2023
        </p>
      </div>
      <div className="pt-2 grid grid-cols-3 grid-rows-5 gap-4 gap-y-2">
        <div></div>
        <p className="font-bold">Start</p>
        <p className="font-bold">End</p>

        <p className="font-bold">Breakfast</p>
        <TimeInputField
          name="breakfastFrom"
          value={breakfastFromValue}
          onChange={handleBreakfastTimeChange}
        />
        <TimeInputField label="breakfastTo" />

        <p className="font-bold">Crew Call</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />

        <p className="font-bold">Shooting Call</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />

        <p className="font-bold">Lunch</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>
    </form>
  );
};

export default ScheduleOfTheDayForm;
