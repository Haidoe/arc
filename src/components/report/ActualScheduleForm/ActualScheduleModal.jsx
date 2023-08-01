import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import Modal from "~/components/Modal";
import Accordion from "../Accordion";
import TextInputField from "~/components/TextInputField";
import Button from "~/components/Button";
//redux
import { updateActualSchedule } from "~/redux/features/ProductionReportSlice";
import { updateProductionReportById } from "~/service/production";

const ActualScheduleModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);

  //For default value of the input field
  const actualSchedule = data.actualSchedule;

  const getValueOrDefault = (obj, property) =>
    obj[property] ? obj[property] : "";

  const firstUnitSchedule = getValueOrDefault(
    actualSchedule.firstUnitInput,
    "schedule"
  );
  const firstUnitActual = getValueOrDefault(
    actualSchedule.firstUnitInput,
    "actual"
  );
  const secondUnitSchedule = getValueOrDefault(
    actualSchedule.secondUnitInput,
    "schedule"
  );
  const secondUnitActual = getValueOrDefault(
    actualSchedule.secondUnitInput,
    "actual"
  );
  const prepSchedule = getValueOrDefault(actualSchedule.prep, "schedule");
  const prepActual = getValueOrDefault(actualSchedule.prep, "actual");
  const travelSchedule = getValueOrDefault(actualSchedule.travel, "schedule");
  const travelActual = getValueOrDefault(actualSchedule.travel, "actual");
  const idleSchedule = getValueOrDefault(actualSchedule.idle, "schedule");
  const idleActual = getValueOrDefault(actualSchedule.idle, "actual");
  const holidaySchedule = getValueOrDefault(actualSchedule.holiday, "schedule");
  const holidayActual = getValueOrDefault(actualSchedule.holiday, "actual");

  //For ref
  const firstUnitScheduleRef = useRef(firstUnitSchedule);
  const firstUnitActualRef = useRef(firstUnitActual);
  const secondUnitScheduleRef = useRef(secondUnitSchedule);
  const secondUnitActualRef = useRef(secondUnitActual);
  const prepScheduleRef = useRef(prepSchedule);
  const prepActualRef = useRef(prepActual);
  const travelScheduleRef = useRef(travelSchedule);
  const travelActualRef = useRef(travelActual);
  const idleScheduleRef = useRef(idleSchedule);
  const idleActualRef = useRef(idleActual);
  const holidayScheduleRef = useRef(holidaySchedule);
  const holidayActualRef = useRef(holidayActual);

  //handle redux update
  const handleReduxUpdate = () => {
    let actualSchedule = {
      ...data.actualSchedule,
      firstUnitInput: {
        schedule: parseInt(firstUnitScheduleRef.current?.value ?? 0),
        actual: parseInt(firstUnitActualRef.current?.value ?? 0),
      },
      secondUnitInput: {
        schedule: parseInt(secondUnitScheduleRef.current?.value ?? 0),
        actual: parseInt(secondUnitActualRef.current?.value ?? 0),
      },
      prep: {
        schedule: parseInt(prepScheduleRef.current?.value ?? 0),
        actual: parseInt(prepActualRef.current?.value ?? 0),
      },
      travel: {
        schedule: parseInt(travelScheduleRef.current?.value ?? 0),
        actual: parseInt(travelActualRef.current?.value ?? 0),
      },
      idle: {
        schedule: parseInt(idleScheduleRef.current?.value ?? 0),
        actual: parseInt(idleActualRef.current?.value ?? 0),
      },
      holiday: {
        schedule: parseInt(holidayScheduleRef.current?.value ?? 0),
        actual: parseInt(holidayActualRef.current?.value ?? 0),
      },
    };

    //updating the actualSchedule object
    dispatch(updateActualSchedule(actualSchedule));

    updateProductionReportById({
      ...data,
      actualSchedule: actualSchedule,
    });

    //closing the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="mx-[-25vw] w-[85vw] lg:w-[50vw]">
        <Accordion
          title="Actual Schedule"
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
          onClose={() => onClose()}
        >
          <div>
            <div className="grid grid-cols-3 gap-4 border-b border-primary-base pb-2 text-base font-bold text-contrast-dark">
              <p>Title</p>
              <p>Schedule</p>
              <p>Actual</p>
            </div>
            <div className="grid-rows-7 grid grid-cols-3 gap-4 gap-y-4 pt-2 text-base font-bold text-contrast-dark">
              <p>1st Unit</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={firstUnitScheduleRef}
                defaultValue={firstUnitSchedule}
              />

              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={firstUnitActualRef}
                defaultValue={firstUnitActual}
              />
              <p>2nd Unit</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={secondUnitScheduleRef}
                defaultValue={secondUnitSchedule}
              />
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={secondUnitActualRef}
                defaultValue={secondUnitActual}
              />

              <p>Prep</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={prepScheduleRef}
                defaultValue={prepSchedule}
              />
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={prepActualRef}
                defaultValue={prepActual}
              />
              <p>Travel</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={travelScheduleRef}
                defaultValue={travelSchedule}
              />
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={travelActualRef}
                defaultValue={travelActual}
              />
              <p>Idle</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={idleScheduleRef}
                defaultValue={idleSchedule}
              />
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={idleActualRef}
                defaultValue={idleActual}
              />
              <p>Holiday</p>
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={holidayScheduleRef}
                defaultValue={holidaySchedule}
              />
              <TextInputField
                type="number"
                placeholder="0"
                maxLength="8"
                ref={holidayActualRef}
                defaultValue={holidayActual}
              />
            </div>
            {/* Action btns */}
            <div className="mt-8 flex justify-end gap-4 py-4">
              {/* Button to cancel */}
              <Button
                buttonType="Secondary"
                className="py-2 font-bold lg:px-8 lg:py-3"
                onClick={onClose}
              >
                Cancel
              </Button>

              {/* Button to save modal */}
              <Button
                buttonType="Primary"
                className="py-2 font-bold lg:px-8 lg:py-3"
                onClick={handleReduxUpdate}
              >
                Save
              </Button>
            </div>
          </div>
        </Accordion>
      </div>
    </Modal>
  );
};

export default ActualScheduleModal;
