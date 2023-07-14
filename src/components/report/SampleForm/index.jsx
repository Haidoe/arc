import { useState } from "react";
import Accordion from "../Accordion";
import TimeInputField from "../../TimeInputField";
import SampleModal from "./SampleModal";
import { useSelector } from "react-redux";
import { datetimeToTime } from "~/helper/time";

const SampleForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useSelector((state) => state.productionReport.data);
  //Here on accordion  will be a purely presentational component or readonly component
  const breakfastFrom = data.scheduleForDay.breakfastFrom
    ? datetimeToTime(data.scheduleForDay.breakfastFrom)
    : "";

  console.log("<><><><><><", breakfastFrom);

  return (
    <>
      <Accordion title="Sample Form" defaultOpen={true}>
        <div onClick={() => setIsOpen(true)}>
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

            <TimeInputField label="breakfastFrom" value={breakfastFrom} />
          </div>
        </div>
      </Accordion>

      <SampleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SampleForm;
