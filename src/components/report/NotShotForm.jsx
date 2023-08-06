import Image from "next/image";
import React, { useState } from "react";
// components
import Button from "~/components/Button";
import TimeInputField from "~/components/TimeInputField";
import Delete from "~/assets/icons/Delete.svg";
import Delete_grey from "~/assets/icons/Delete_grey.svg";
import Edit from "~/assets/icons/Edit.svg";
import Edit_grey from "~/assets/icons/Edit_grey.svg";

// information modal
import InformationModal from "~/components/global/InformationModal";

// import helper functions
import {
  ISOToDateVancouverString,
  ISOToTimeString,
} from "~/helper/timeInputParser.js";

// NotShotForm Dummy component form
const NotShotForm = ({ isReadOnly }) => {
  // information modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const notShotInfo = [
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Rain",
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Actor injured",
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Equipment lost",
    },
  ];

  // action btns hover states
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isEditHover, setIsEditHover] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(undefined);

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
              <div className="inline-block md:min-w-full min-w-[550px] align-middle">
                <table className="min-w-full divide-y divide-primary-base">
                  <thead className="text-base font-bold text-contrast-dark">
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Scene No.
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Date
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Time
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Reason
                      </th>

                      {/* Hide this column if isReadOnly  */}
                      {!isReadOnly && (
                        <th
                          scope="col"
                          className="relative min-w-[60px] py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                          <span className="sr-only">Delete</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  {notShotInfo?.length > 0 && (
                    <tbody className="divide-y divide-contrast-lighter text-base text-contrast-dark">
                      {notShotInfo.map((row, idx) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 font-medium sm:pl-0">
                            {/* From drop down from Production Scenes Array */}
                            {idx + 1}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            {ISOToDateVancouverString(row.date)}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            <TimeInputField
                              tabIndex="-1"
                              label="not shot time"
                              isReadyOnly={true}
                              value={ISOToTimeString(row.time)}
                            />
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.reason}
                          </td>

                          {/* Hide this column if isReadOnly  */}
                          {!isReadOnly && (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right  font-medium sm:pr-0">
                              <div className="flex flex-row gap-2">
                                {/* edit row btn */}
                                <div className="edit-row-btn-container">
                                  {isEditHover && hoverIdx == idx ? (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onClick={() => setIsInfoModalOpen(true)}
                                      onMouseLeave={() => {
                                        setIsEditHover(false);
                                        setHoverIdx(undefined);
                                      }}
                                      src={Edit}
                                      alt="Delete icon"
                                    />
                                  ) : (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onClick={() => setIsInfoModalOpen(true)}
                                      onMouseEnter={(e) => {
                                        setIsEditHover(true);
                                        setHoverIdx(idx);
                                      }}
                                      src={Edit_grey}
                                      alt="Edit icon"
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
                {notShotInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="">No not shot scenes infomation found.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Button to Create New Line */}
            {/* Hide this button if isReadOnly  */}
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

export default NotShotForm;
