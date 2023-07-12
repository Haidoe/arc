import { useSelector } from "react-redux";
import TimeInputField from "../TimeInputField";
// import { useRef, useEffect } from "react";
// import dayjs from "dayjs";
// import timezone from "dayjs/plugin/timezone";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(localizedFormat);
// dayjs.extend(utc);
// dayjs.extend(timezone);
// import localizedFormat from "dayjs/plugin/localizedFormat";

const ScheduleOfTheDayForm = ({ className }) => {

  const scheduleForDay = useSelector(state => state.productionReport)
  console.log(scheduleForDay);

  // const breakfastFromRef = useRef(null)

  // useEffect(() => {
  //   breakfastFromRef.current = scheduleForDay.breakfastFrom
  // }, [])


  // const date = dayjs(datetime).tz("America/Vancouver").format("ll");
  // const time = dayjs(datetime).tz("America/Vancouver").format("LT");
  // console.log(breakfastFromRef.current)

  // const breakFastFromInitialValue = breakfastFromRef.current
  // console.log(breakFastFromInitialValue)

  // const timeIn = timeStringToISO(breakFastFromInitialValue)


  // const breakFastFromInitialValue = breakfastFromRef.current
  // console.log(breakFastFromInitialValue)

  return (
    <form action="" className={` text-contrast-dark text-base ${className}`}>
      <div className="flex justify-between border-b border-primary-base pb-2">
        <p className="font-bold text-base text-tertiary-dark">Tue Jun 27, 2023</p>
      </div>
      <div className="pt-2 grid grid-cols-3 grid-rows-5 gap-4 gap-y-2">
        <div></div>
        <p className="font-bold">Start</p>
        <p className="font-bold">End</p>

        <p className="font-bold ">Breakfast</p>
        <TimeInputField label="breakfastFrom" />
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
  )
}


export default ScheduleOfTheDayForm