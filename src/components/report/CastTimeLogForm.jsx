// react imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCastTimeLog } from "~/redux/features/ProductionReportSlice";
import Image from "next/image";

// components
import Button from "~/components/Button";
import TimeInputField from "~/components/TimeInputField";
import Delete from "~/assets/icons/Delete.svg";

// import edit and delete modals
import AccordionCrudModalAdd from "~/components/report/AccordionCrudModalAdd";
// import AccordionCrudModalDelete from "~/components/report/AccordionCrudModalDelete";
import ConfirmationModal from "~/components/global/ConfirmationModal";

// helper
import { ISOToTimeString } from "~/helper/timeInputParser";
import { updateProductionReportById } from "~/service/production";

// CastTimeLog component form
const CastTimeLogForm = ({ productionInfo, isReadOnly }) => {
  console.log("TEST IS READY ONLY: ", isReadOnly);
  // to show or hide the add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // to show or hide the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // selected index
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);
  const castTimeLogInfo = data.castTimeLog;

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

  function hideAddModal() {
    console.log("hide modal hit");
    setSelectedIndex(undefined);
    setShowAddModal(false);
  }

  // on modal close set selected index to undefined

  function deleteConfirmationHandler() {
    const updatedRows = castTimeLogInfo.filter(
      (item, i) => i !== selectedIndex
    );

    dispatch(updateCastTimeLog(updatedRows));
    setSelectedIndex(undefined);
    setShowDeleteModal(false);

    try {
      updateProductionReportById({
        ...data,
        castTimeLog: updatedRows,
      });
    } catch (error) {
      console.log("DELETING CAST TIME LOG ERROR: ", error);
    }
  }

  return (
    <>
      {showAddModal && (
        <AccordionCrudModalAdd
          type="castTimeLog"
          modalWidth={90}
          hideAddModal={hideAddModal}
          selectedIndex={selectedIndex}
          productionInfo={productionInfo}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          heading="Delete Confirmation"
          message="Are you sure you want to delete?"
          cancelHandler={() => setShowDeleteModal(false)}
          actionHandler={(selectedIndex) =>
            deleteConfirmationHandler(selectedIndex)
          }
        />
      )}

      {
        <div>
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="text-bold min-w-full divide-y divide-primary-base text-base text-contrast-dark">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        No.
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Cast
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Character
                      </th>
                      <th scope="col" className="px-2 pb-3.5 text-left ">
                        Status
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Work Schedule
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Meals
                      </th>

                      {/* Hide this column if the form is read only */}
                      {!isReadOnly && (
                        <th
                          scope="col"
                          className="relative min-w-[60px] pb-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  {castTimeLogInfo?.length > 0 && (
                    <tbody className="divide-y divide-contrast-lighter text-base">
                      {castTimeLogInfo.map((row, idx) => (
                        <tr key={idx} onClick={(e) => rowClickHandler(e, idx)}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3  font-medium sm:pl-0">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4  text-contrast-dark">
                            {row.cast}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4  text-contrast-dark">
                            {row.character}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-contrast-dark">
                            {row.status}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4  text-contrast-dark">
                            {idx == 0 && (
                              <div className="mb-2 mt-[-10px] flex gap-1">
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  MU Report
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  On Set
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Set Wrap
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Set Dismiss
                                </div>
                              </div>
                            )}

                            <div className="flex gap-1">
                              <TimeInputField
                                containerClass="flex-1"
                                label="MU Report"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.muReport
                                )}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="On Set"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.workSchedule.onSet)}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="Set Wrap"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.setWrap
                                )}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="Set Dismiss"
                                isReadyOnly={true}
                                value={ISOToTimeString(
                                  row.workSchedule.setDismiss
                                )}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4  text-contrast-dark">
                            {idx == 0 && (
                              <div className="mb-2 mt-[-10px] flex gap-1">
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Lunch In
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Lunch Out
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Dinner In
                                </div>
                                <div className="flex-1 text-center text-[.9rem] font-normal">
                                  Dinner Out
                                </div>
                              </div>
                            )}

                            {/* {row.meals} */}
                            <div className="flex gap-1">
                              <TimeInputField
                                containerClass="flex-1"
                                label="Lunch In"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.lunchIn)}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="Lunch Out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.lunchOut)}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="Second Meal In"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.secondMealIn)}
                              />
                              <TimeInputField
                                containerClass="flex-1"
                                label="Second Meal Out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.meals.secondMealOut)}
                              />
                            </div>
                          </td>

                          {/* Hide this column if the form is read only */}
                          {!isReadOnly && (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right  font-medium sm:pr-0">
                              <Image
                                className={`icon-delete-row hover:cursor-pointer`}
                                src={Delete}
                                alt="Delete icon"
                              />
                              <span className="sr-only">
                                Delete Cast Number {idx + 1}
                              </span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {/* Else show empty message with button */}
                {castTimeLogInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className=" text-contrast-dark">
                        No cast time log found.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Button to Create New Line */}
            {/* Hide this button if the form is read only */}
            {!isReadOnly && (
              <div className="mt-2 flex justify-between  gap-4 py-4">
                <div className=" self-end text-xs ">
                  Naming Conventions - Work:W / Start:S / Finish:F / Hold:H /
                  Travel:TR / Fitting:FT / Rehearsal:R / Test:T
                </div>
                <Button
                  onClick={addClickHandler}
                  buttonType="Secondary"
                  className="border-2 px-4 py-2 font-bold lg:px-8 lg:py-3"
                >
                  Create New Line
                </Button>
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default CastTimeLogForm;
