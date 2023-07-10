// react imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

// components
import Button from "~/components/Button";
import TimeInputField from "~/components/TimeInputField";
import Delete from "~/assets/icons/Delete.svg";

// import edit and delete modals
import AccordionCrudModalAdd from "~/components/report/AccordionCrudModalAdd";
import AccordionCrudModalDelete from "~/components/report/AccordionCrudModalDelete";

// helper
import { ISOToTimeString } from "~/helper/timeInputParser";

// CastTimeLog component form
const CastTimeLogForm = () => {
  // to show or hide the add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // to show or hide the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // selected index
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const castTimeLogInfo = useSelector(
    (state) => state.productionReport.data.castTimeLog
  );

  const dispatch = useDispatch();

  // const updateCastTimeLogArray = (index, object) => {
  //   const updatedArray = [...castTimeLogInfo];
  //   updatedArray[index] = object;
  //   // todo
  //   // dispatch(updateCastTimeLog(updatedArray)); // Dispatch the action to update the state
  // };

  // const deleteCastTimeLogRow = (index) => {
  //   const updatedArray = castTimeLogInfo.filter((item, i) => i !== index);
  //   console.log(updatedArray);
  //   // todo
  //   // dispatch(updateCastTimeLog(updatedArray)); // Dispatch the action to update the state
  // };

  const CastTimeLogInfo = [
    {
      cast: "Actor1",
      character: "Character1",
      status: "Status1",
      workSchedule: {
        muReport: "2023-07-01T07:00:00.000Z",
        onSet: "2023-07-01T12:00:00.000Z",
        setWrap: "2023-07-04T19:00:00.000Z",
        setDismiss: "2023-07-04T20:00:00.000Z",
      },
      meals: {
        lunchIn: "2023-07-02T09:00:00.000Z",
        lunchOut: "2023-07-02T10:00:00.000Z",
        secondMealIn: "2023-07-04T20:00:00.000Z",
        secondMealOut: "2023-07-04T21:00:00.000Z",
      },
    },
    {
      cast: "Actor2",
      character: "Character2",
      status: "Status2",
      workSchedule: {
        muReport: "2023-07-01T07:00:00.000Z",
        onSet: "2023-07-01T12:30:00.000Z",
        setWrap: "2023-07-04T19:30:00.000Z",
        setDismiss: "2023-07-04T20:30:00.000Z",
      },
      meals: {
        lunchIn: "2023-07-02T09:30:00.000Z",
        lunchOut: "2023-07-02T10:30:00.000Z",
        secondMealIn: "2023-07-04T20:30:00.000Z",
        secondMealOut: "2023-07-04T21:30:00.000Z",
      },
    },
  ];

  // ================================> Form event functions
  function addClickHandler() {
    setSelectedIndex(undefined);
    setShowAddModal(true);
  }

  function rowClickHandler(event, idx) {
    event.preventDefault();
    // delete condition
    if (event.target.className.includes("icon-delete-row")) {
      setSelectedIndex(idx);
      setShowDeleteModal(true);
    } else {
      // edit condition
      setSelectedIndex(idx);
      setShowAddModal(true);
    }
  }

  // ================================> Modal event functions
  function OnUpdateHandler(idx, action, data) {
    if (action == "add") {
      // on add
      const extendedArray = [...castTimeLogInfo];
      extendedArray.push(data);

      console.log(extendedArray);
    } else if (action == "update") {
      // on update`
      const updatedArray = [...castTimeLogInfo];
      updatedArray[idx] = data;

      console.log(updatedArray);
    } else {
      // on cancel
      console.log("cancel");
    }
  }

  // on modal close set selected index to undefined

  function deleteConfirmationHandler(idx, action) {
    if (action == "delete") {
      const updatedArray = castTimeLogInfo.filter((item, i) => i !== idx);
      console.log(updatedArray);
    } else {
      // cancel
      setSelectedIndex(undefined);
      setShowDeleteModal(false);
    }
  }

  return (
    <>
      {showAddModal && (
        <AccordionCrudModalAdd
          type="castTimeLog"
          onUpdateRow={OnUpdateHandler}
          selectedIndex={selectedIndex}
        />
      )}

      {showDeleteModal && (
        <AccordionCrudModalDelete
          onDeleteConfirmation={deleteConfirmationHandler}
          selectedIndex={selectedIndex}
        />
      )}

      {
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cast
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Character
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Work Schedule
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Meals
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  {CastTimeLogInfo?.length > 0 && (
                    <tbody className="divide-y divide-gray-200">
                      {CastTimeLogInfo.map((row, idx) => (
                        <tr key={idx} onClick={(e) => rowClickHandler(e, idx)}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {row.cast}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {row.character}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {row.status}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex gap-1">
                              <TimeInputField
                                label="MU Report"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.muReport
                                )}
                              />
                              <TimeInputField
                                label="On Set"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.workSchedule.onSet)}
                              />
                              <TimeInputField
                                label="Set Wrap"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.setWrap
                                )}
                              />
                              <TimeInputField
                                label="Set Dismiss"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.setDismiss
                                )}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {/* {row.meals} */}
                            <div className="flex gap-1">
                              <TimeInputField
                                label="Lunch In"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.lunchIn)}
                              />
                              <TimeInputField
                                label="Lunch Out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.lunchOut)}
                              />
                              <TimeInputField
                                label="Second Meal In"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.secondMealIn)}
                              />
                              <TimeInputField
                                label="Second Meal Out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.secondMealOut)}
                              />
                            </div>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Image
                              className={`icon-delete-row hover:cursor-pointer`}
                              src={Delete}
                              alt="Delete icon"
                            />
                            <span className="sr-only">
                              Delete Cast Number {idx + 1}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {/* Else show empty message with button */}
                {castTimeLogInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        No cast time log found.
                      </p>
                    </div>
                  </div>
                )}
                {/* Button to Create New Line */}
                <div className="mt-2 flex justify-end gap-4 border-primary-base pt-4">
                  <Button
                    onClick={addClickHandler}
                    buttonType="Secondary"
                    className="px-2 py-1"
                  >
                    Create New Line
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CastTimeLogForm;
