import Button from "~/components/Button";
import TimeInputField from "~/components/TimeInputField";
import { useState, useRef } from "react";
import DropDown from "~/components/global/DropDown.jsx";

// helper
import { ISOToTimeString, timeStringToISO } from "~/helper/timeInputParser";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateCastTimeLog } from "~/redux/features/ProductionReportSlice";
import { updateProductionReportById } from "~/service/production";

// status drop down
const status = [
  { id: 1, name: "W" },
  { id: 2, name: "S" },
  { id: 3, name: "F" },
  { id: 4, name: "H" },
  { id: 5, name: "TR" },
  { id: 6, name: "FT" },
  { id: 7, name: "R" },
  { id: 8, name: "T" },
];

// handles add or update to in the modal
const CastTimeLogUpsert = ({ idx, closeModal, productionInfo }) => {
  // =======================> Resources

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);
  const castTimeLog = useSelector(
    (state) => state.productionReport.data.castTimeLog
  );
  const isUpdate = idx !== undefined ? true : false;
  const allCast = productionInfo.casts;

  // =======================> Initial Values

  function getCastIdx(castName) {
    // find at what index the castName is in the allCast array
    const castIdx = allCast.findIndex((cast) => cast.name === castName);
    return castIdx;
  }

  // cast
  const cast_iv = isUpdate ? castTimeLog[idx].cast : "";
  const castIdx = isUpdate ? getCastIdx(cast_iv) : 0;

  // status
  const status_iv = isUpdate ? castTimeLog[idx].status : "";
  const statusIdx = isUpdate
    ? status.findIndex((stat) => stat.name === status_iv)
    : 0;

  // workSchedule
  const workSchedule_muReport_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].workSchedule.muReport)
    : ISOToTimeString("");

  const workSchedule_onSet_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].workSchedule.onSet)
    : ISOToTimeString("");
  const workSchedule_setWrap_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].workSchedule.setWrap)
    : ISOToTimeString("");
  const workSchedule_setDismiss_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].workSchedule.setDismiss)
    : ISOToTimeString("");

  // meals
  const meals_lunchIn_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].meals.lunchIn)
    : ISOToTimeString("");
  const meals_lunchOut_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].meals.lunchOut)
    : ISOToTimeString("");
  const meals_secondMealIn_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].meals.secondMealIn)
    : ISOToTimeString("");
  const meals_secondMealOut_iv = isUpdate
    ? ISOToTimeString(castTimeLog[idx].meals.secondMealOut)
    : ISOToTimeString("");

  // =======================> States
  const [selectedCast, setSelectedCast] = useState(allCast[castIdx]);

  // status drop down
  const [selectedStatus, setSelectedStatus] = useState(status[statusIdx]);

  // ======================> Refs

  // workSchedule
  const workSchedule_muReport = useRef(workSchedule_muReport_iv);
  const workSchedule_onSet = useRef(workSchedule_onSet_iv);
  const workSchedule_setWrap = useRef(workSchedule_setWrap_iv);
  const workSchedule_setDismiss = useRef(workSchedule_setDismiss_iv);

  // meals
  const meals_lunchIn = useRef(meals_lunchIn_iv);
  const meals_lunchOut = useRef(meals_lunchOut_iv);
  const meals_secondMealIn = useRef(meals_secondMealIn_iv);
  const meals_secondMealOut = useRef(meals_secondMealOut_iv);

  // ======================> Event Handlers

  // data handlers
  function onUpdateHandler() {
    const row = {
      cast: selectedCast.name,
      character: selectedCast.character,
      status: selectedStatus.name,
      workSchedule: {
        muReport: workSchedule_muReport.current.value
          ? timeStringToISO(workSchedule_muReport.current.value)
          : null,
        onSet: workSchedule_onSet.current.value
          ? timeStringToISO(workSchedule_onSet.current.value)
          : null,
        setWrap: workSchedule_setWrap.current.value
          ? timeStringToISO(workSchedule_setWrap.current.value)
          : null,
        setDismiss: workSchedule_setDismiss.current.value
          ? timeStringToISO(workSchedule_setDismiss.current.value)
          : null,
      },
      meals: {
        lunchIn: meals_lunchIn.current.value
          ? timeStringToISO(meals_lunchIn.current.value)
          : null,
        lunchOut: meals_lunchOut.current.value
          ? timeStringToISO(meals_lunchOut.current.value)
          : null,
        secondMealIn: meals_secondMealIn.current.value
          ? timeStringToISO(meals_secondMealIn.current.value)
          : null,
        secondMealOut: meals_secondMealOut.current.value
          ? timeStringToISO(meals_secondMealOut.current.value)
          : null,
      },
    };

    const allRows = [...castTimeLog];

    allRows[idx] = row;

    // pass to redux
    dispatch(updateCastTimeLog(allRows));

    updateProductionReportById({
      ...data,
      castTimeLog: allRows,
    });
  }

  function onAddHandler() {
    const row = {
      cast: selectedCast.name,
      character: selectedCast.character,
      status: selectedStatus.name,
      workSchedule: {
        muReport: workSchedule_muReport.current.value
          ? timeStringToISO(workSchedule_muReport.current.value)
          : null,
        onSet: workSchedule_onSet.current.value
          ? timeStringToISO(workSchedule_onSet.current.value)
          : null,
        setWrap: workSchedule_setWrap.current.value
          ? timeStringToISO(workSchedule_setWrap.current.value)
          : null,
        setDismiss: workSchedule_setDismiss.current.value
          ? timeStringToISO(workSchedule_setDismiss.current.value)
          : null,
      },
      meals: {
        lunchIn: meals_lunchIn.current.value
          ? timeStringToISO(meals_lunchIn.current.value)
          : null,
        lunchOut: meals_lunchOut.current.value
          ? timeStringToISO(meals_lunchOut.current.value)
          : null,
        secondMealIn: meals_secondMealIn.current.value
          ? timeStringToISO(meals_secondMealIn.current.value)
          : null,
        secondMealOut: meals_secondMealOut.current.value
          ? timeStringToISO(meals_secondMealOut.current.value)
          : null,
      },
    };

    const allRows = [...castTimeLog, row];

    // pass to redux
    dispatch(updateCastTimeLog(allRows));

    updateProductionReportById({
      ...data,
      castTimeLog: allRows,
    });
  }

  // modal handlers
  function saveModalHandler() {
    if (isUpdate) {
      // to update
      onUpdateHandler();
      closeModal();
    } else {
      onAddHandler();
      closeModal();
    }
  }

  const modalHeightClass = " h-[300px]";

  return (
    <>
      <div className="">
        <div className={modalHeightClass}>
          <div className="min-h-[200px] overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-primary-base text-base text-contrast-dark font-bold">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 pb-3.5 text-left "
                    >
                      Cast
                    </th>
                    <th
                      scope="col"
                      className="px-3 pb-3.5 text-left "
                    >
                      Character
                    </th>
                    <th
                      scope="col"
                      className="px-3 pb-3.5 text-left "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 pb-3.5 text-left "
                    >
                      Work Schedule
                    </th>
                    <th
                      scope="col"
                      className="px-3 pb-3.5 text-left "
                    >
                      Meals
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-3 py-4 ">
                      {/* row cast */}
                      <DropDown
                        people={allCast}
                        selected={selectedCast}
                        setSelected={setSelectedCast}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 ">
                      {selectedCast?.character ?? ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 ">
                      <DropDown
                        width="small"
                        people={status}
                        selected={selectedStatus}
                        setSelected={setSelectedStatus}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 ">
                      <div className="flex gap-1">
                        <TimeInputField
                          label="MU Report"
                          defaultValue={workSchedule_muReport_iv}
                          ref={workSchedule_muReport}
                        />
                        <TimeInputField
                          label="On Set"
                          defaultValue={workSchedule_onSet_iv}
                          ref={workSchedule_onSet}
                        />
                        <TimeInputField
                          label="Set Wrap"
                          defaultValue={workSchedule_setWrap_iv}
                          ref={workSchedule_setWrap}
                        />
                        <TimeInputField
                          label="Set Dismiss"
                          defaultValue={workSchedule_setDismiss_iv}
                          ref={workSchedule_setDismiss}
                        />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 ">
                      {/* {row.meals} */}
                      <div className="flex gap-1">
                        <TimeInputField
                          label="Lunch In"
                          defaultValue={meals_lunchIn_iv}
                          ref={meals_lunchIn}
                        />
                        <TimeInputField
                          label="Lunch Out"
                          defaultValue={meals_lunchOut_iv}
                          ref={meals_lunchOut}
                        />
                        <TimeInputField
                          label="Second Meal In"
                          defaultValue={meals_secondMealIn_iv}
                          ref={meals_secondMealIn}
                        />
                        <TimeInputField
                          label="Second Meal Out"
                          defaultValue={meals_secondMealOut_iv}
                          ref={meals_secondMealOut}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4 border-primary-base pt-4">
            {/* Button to cancel */}
            <Button
              buttonType="Secondary"
              className="px-2 py-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
            {/* Button to save modal */}
            <Button
              buttonType="Secondary"
              className="px-2 py-1"
              onClick={saveModalHandler}
            >
              {isUpdate ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CastTimeLogUpsert;
