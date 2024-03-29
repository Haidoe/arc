import Image from "next/image";
import React, { useState } from "react";
// components
import Button from "~/components/Button";
import TimeInputField from "~/components/TimeInputField";
import Delete from "~/assets/icons/Delete.svg";
import Delete_grey from "~/assets/icons/Delete_grey.svg";
import Edit from "~/assets/icons/Edit.svg";
import Edit_grey from "~/assets/icons/Edit_grey.svg";

// import helper functions
import { ISOToTimeString } from "~/helper/timeInputParser.js";

// information modal
import InformationModal from "~/components/global/InformationModal";

// ExtrasCastForm Dummy component form
const ExtrasCastForm = ({ isReadOnly }) => {
  // action btns hover states
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isEditHover, setIsEditHover] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(undefined);

  // information modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const extrasCastInfo = [
    {
      qty: 3,
      name: "Poor New Yorkers in slum",
      notes: "All returning tomorrow",
      schedule: {
        in: "2023-07-02T22:00:00.000Z",
        out: "2023-07-02T22:00:00.000Z",
        meal: "2023-07-02T22:00:00.000Z",
        rate: 100,
      },
    },
    {
      qty: 2,
      name: "Bodyguards of the Senetor Pablo",
      notes: "Required in 5 scenes",
      schedule: {
        in: "2023-07-02T22:00:00.000Z",
        out: "2023-07-02T22:00:00.000Z",
        meal: "2023-07-02T22:00:00.000Z",
        rate: 150,
      },
    },
  ];

  return (
    <>
      {isInfoModalOpen && (
        <InformationModal
          heading={"Future Component"}
          message={"This feature will be live in the coming future"}
          closeModalHandler={() => setIsInfoModalOpen(false)}
        />
      )}
      {
        <div>
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block md:min-w-full min-w-[1000px] align-middle">
                <table className="min-w-full divide-y divide-primary-base text-base text-contrast-dark">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Quantity
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Description
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Notes
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Schedule
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Rate
                      </th>
                      {/* Hide this column if the form is read only */}
                      {!isReadOnly && (
                        <th
                          scope="col"
                          className="relative min-w-[60px] pb-3.5 pl-3 pr-4 text-contrast-dark sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                          <span className="sr-only">Delete</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  {extrasCastInfo?.length > 0 && (
                    <tbody className="divide-y divide-contrast-lighter text-base  text-contrast-dark">
                      {extrasCastInfo.map((row, idx) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium  sm:pl-0">
                            {/* From drop down from Production Scenes Array */}
                            {row.qty}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.notes}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            <div className="flex gap-1">
                              <TimeInputField
                                tabIndex="-1"
                                label="schedule in"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.in)}
                              />
                              <TimeInputField
                                tabIndex="-1"
                                label="schedule out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.out)}
                              />
                              <TimeInputField
                                tabIndex="-1"
                                label="meal break"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.meal)}
                              />
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            ${row.schedule.rate}
                          </td>

                          {/* Hide this column if the form is read only */}
                          {!isReadOnly && (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-0">
                              <div className="flex flex-row gap-2">
                                {/* edit row btn */}
                                <div className="edit-row-btn-container">
                                  {isEditHover && hoverIdx == idx ? (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onMouseLeave={() => {
                                        setIsEditHover(false);
                                        setHoverIdx(undefined);
                                      }}
                                      src={Edit}
                                      alt="Delete icon"
                                      onClick={() => setIsInfoModalOpen(true)}
                                    />
                                  ) : (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onMouseEnter={(e) => {
                                        setIsEditHover(true);
                                        setHoverIdx(idx);
                                      }}
                                      src={Edit_grey}
                                      alt="Edit icon"
                                      onClick={() => setIsInfoModalOpen(true)}
                                    />
                                  )}

                                  <span className="sr-only">
                                    Edit Scene Row {idx + 1}
                                  </span>
                                </div>
                                {/* delete row btn */}
                                <div className="delete-row-btn-container">
                                  {isDeleteHover && hoverIdx == idx ? (
                                    <Image
                                      className={`delete-row-btn hover:cursor-pointer`}
                                      onClick={() => setIsInfoModalOpen(true)}
                                      onMouseLeave={() => {
                                        setIsDeleteHover(false);
                                        setHoverIdx(undefined);
                                      }}
                                      src={Delete}
                                      alt="Delete icon"
                                    />
                                  ) : (
                                    <Image
                                      className={`delete-row-btn hover:cursor-pointer`}
                                      onClick={() => setIsInfoModalOpen(true)}
                                      onMouseEnter={() => {
                                        setIsDeleteHover(true);
                                        setHoverIdx(idx);
                                      }}
                                      src={Delete_grey}
                                      alt="Delete icon"
                                    />
                                  )}
                                  <span className="sr-only">
                                    Delete Scene Row {idx + 1}
                                  </span>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {/* Else show empty message with button */}
                {extrasCastInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="">No not shot scenes infromation found.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Button to Create New Line */}
            {/* Hide this button if the form is read only */}
            {!isReadOnly && (
              <div className="mt-2 flex justify-end gap-4 py-4">
                <Button
                  buttonType="Secondary"
                  className="border-2 px-4 py-2 font-bold lg:px-8 lg:py-3"
                  onClick={() => setIsInfoModalOpen(true)}
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

export default ExtrasCastForm;
