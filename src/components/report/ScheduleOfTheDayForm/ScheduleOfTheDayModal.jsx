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

  //handle redux update
  const handleReduxUpdate = () => {
    //This is to check if they are any changes in the input field
    if (
      breakfastFromRef.current?.value ||
      breakfastToRef.current?.value ||
      crewCallFromRef.current?.value ||
      crewCallToRef.current?.value ||
      shootingCallFromRef.current?.value ||
      shootingCallToRef.current?.value ||
      lunchFromRef.current?.value ||
      lunchToRef.current?.value
    ) {
      let scheduleForDay = {
        ...data.scheduleForDay,
        breakfastFrom: timeToDatetime(breakfastFromRef.current.value),
        breakfastTo: timeToDatetime(breakfastToRef.current.value),
        crewCallFrom: timeToDatetime(crewCallFromRef.current.value),
        crewCallTo: timeToDatetime(crewCallToRef.current.value),
        shootingCallFrom: timeToDatetime(shootingCallFromRef.current.value),
        shootingCallTo: timeToDatetime(shootingCallToRef.current.value),
        lunchFrom: timeToDatetime(lunchFromRef.current.value),
        lunchTo: timeToDatetime(lunchToRef.current.value),
      };

      //Updating the redux
      console.log("Before dispatching" + scheduleForDay);
      dispatch(updateScheduleForDay(scheduleForDay));
      console.log("After dispatching" + scheduleForDay);

      updateProductionReportById({
        ...data,
        scheduleForDay,
      });
    }

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
            <div className="flex justify-between border-b border-primary-base pb-2 text-base text-contrast-dark">
              <p className="text-base font-bold text-tertiary-dark">
                {currentDate}
              </p>
            </div>

            <div className="grid grid-cols-3 grid-rows-5 gap-4 gap-y-2 pt-2">
              <div></div>
              <p className="font-bold">Start</p>
              <p className="font-bold">End</p>
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
        </Accordion>
      </div>
    </Modal>
  );
};

export default ScheduleOfTheDayModal;
