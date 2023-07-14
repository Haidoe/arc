import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "~/components/Modal";
import { datetimeToTime, timeToDatetime } from "~/helper/time";
import { updateScheduleForDay } from "~/redux/features/ProductionReportSlice";
import TimeInputField from "~/components/TimeInputField";

const SampleModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);

  //For default value of the input field
  const breakfastFrom = data.scheduleForDay.breakfastFrom
    ? datetimeToTime(data.scheduleForDay.breakfastFrom)
    : "";

  const breakfastFromRef = useRef(breakfastFrom);

  const handleReduxUpdate = () => {
    //This is to check if they are any changes in the input field
    if (breakfastFromRef.current?.value) {
      //For this example I just want to update the breakfastFrom
      let scheduleForDay = {
        ...data.scheduleForDay,
        breakfastFrom: timeToDatetime(breakfastFromRef.current.value),
      };

      //Updating the redux
      dispatch(updateScheduleForDay(scheduleForDay));
    }

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleReduxUpdate}>
      <form action="" className={`text-base text-contrast-dark `}>
        <div className="flex justify-between border-b border-primary-base pb-2">
          <p className="text-base font-bold text-tertiary-dark">
            Tue Jun 27, 2023
          </p>
        </div>

        <div className="grid grid-cols-3 grid-rows-5 gap-4 gap-y-2 pt-2">
          <div></div>
          <p className="font-bold">Start</p>
          <p className="font-bold">End</p>
          <p className="font-bold">Breakfast</p>

          {/* Please check why this component is not working properly with ref */}
          <TimeInputField label="breakfastFrom" ref={breakfastFromRef} defaultValue={breakfastFrom} />
          {/*
          <input
            type="time"
            ref={breakfastFromRef}
            defaultValue={breakfastFrom}
          /> */}
        </div>
      </form>
    </Modal>
  );
};

export default SampleModal;
