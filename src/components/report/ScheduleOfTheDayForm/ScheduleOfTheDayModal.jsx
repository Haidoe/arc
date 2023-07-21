import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Modal
import Modal from "~/components/Modal";
import TimeInputField from "~/components/TimeInputField";
import Accordion from "../Accordion";

//Helper
import { datetimeToTime, timeToDatetime } from "~/helper/time";

//Redux
import { updateScheduleForDay } from "~/redux/features/ProductionReportSlice";
import { updateProductionReportById } from "~/service/production";

//Components
const ScheduleOfTheDayModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);

  //For default value of the input field
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

  //For setting the default value of the input field
  //useRef is used to get the value of the input field
  const breakfastFromRef = useRef(breakfastFrom);
  const breakfastToRef = useRef(breakfastTo);
  const crewCallFromRef = useRef(crewCallFrom);
  const crewCallToRef = useRef(crewCallTo);
  const shootingCallFromRef = useRef(shootingCallFrom);
  const shootingCallToRef = useRef(shootingCallTo);
  const lunchFromRef = useRef(lunchFrom);
  const lunchToRef = useRef(lunchTo);

  // To get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // To get current time make sure to use 24 hours format
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //handle redux update
  const handleReduxUpdate = () => {
    //This is to check if they are any changes in the input field

    let scheduleForDay = {
      ...data.scheduleForDay,
      //check first if current value is empty if it is then use the default value
      //if not then use the current value and call the timeToDatetime function to convert it to datetime

      breakfastFrom:
        breakfastFromRef.current.value === ""
          ? null
          : timeToDatetime(breakfastFromRef.current.value),
      breakfastTo:
        breakfastToRef.current.value === ""
          ? null
          : timeToDatetime(breakfastToRef.current.value),
      crewCallFrom:
        crewCallFromRef.current.value === ""
          ? null
          : timeToDatetime(crewCallFromRef.current.value),
      crewCallTo:
        crewCallToRef.current.value === ""
          ? null
          : timeToDatetime(crewCallToRef.current.value),
      shootingCallFrom:
        shootingCallFromRef.current.value === ""
          ? null
          : timeToDatetime(shootingCallFromRef.current.value),
      shootingCallTo:
        shootingCallToRef.current.value === ""
          ? null
          : timeToDatetime(shootingCallToRef.current.value),
      lunchFrom:
        lunchFromRef.current.value === ""
          ? null
          : timeToDatetime(lunchFromRef.current.value),
      lunchTo:
        lunchToRef.current.value === ""
          ? null
          : timeToDatetime(lunchToRef.current.value),
    };

    //Updating the redux
    console.log("Before dispatching" + scheduleForDay);
    dispatch(updateScheduleForDay(scheduleForDay));
    console.log("After dispatching" + scheduleForDay);

    updateProductionReportById({
      ...data,
      scheduleForDay,
    });


    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReduxUpdate}>
      <div className="mx-[-25vw] w-[50vw]">
        <Accordion
          title="Schedule of the Day"
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
        >
          <div>
            <div className="flex justify-between border-b border-primary-base pb-2 text-base font-bold text-contrast-dark">
              <p className=" text-tertiary-dark">
                {currentDate}
              </p>
              <p className=" text-tertiary-dark">
                {currentTime}
              </p>
            </div>

            <div className="text-base text-contrast-dark py-2">
              <div className="grid grid-cols-3 gap-4 pt-2 pb-2">
                <div></div>
                <p className="font-bold">Start</p>
                <p className="font-bold">End</p>
              </div>
              <div className="grid grid-cols-3 grid-rows-4 gap-4 gap-y-3">
                <p className="font-bold">Breakfast</p>
                <TimeInputField
                  ref={breakfastFromRef}
                  defaultValue={breakfastFrom}
                />
                <TimeInputField ref={breakfastToRef} defaultValue={breakfastTo} />
                <p className="font-bold">Crew Call</p>
                <TimeInputField
                  ref={crewCallFromRef}
                  defaultValue={crewCallFrom}
                />
                <TimeInputField ref={crewCallToRef} defaultValue={crewCallTo} />
                <p className="font-bold">Shooting Call</p>
                <TimeInputField
                  ref={shootingCallFromRef}
                  defaultValue={shootingCallFrom}
                />
                <TimeInputField
                  ref={shootingCallToRef}
                  defaultValue={shootingCallTo}
                />
                <p className="font-bold">Lunch</p>
                <TimeInputField ref={lunchFromRef} defaultValue={lunchFrom} />
                <TimeInputField ref={lunchToRef} defaultValue={lunchTo} />
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    </Modal>
  );
};

export default ScheduleOfTheDayModal;
