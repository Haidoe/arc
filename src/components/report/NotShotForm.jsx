// react imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShotScene } from "~/redux/features/ProductionReportSlice";
import Image from "next/image";

// components
import Button from "~/components/Button";
import Delete from "~/assets/icons/Delete.svg";
import TimeInputField from "~/components/TimeInputField";

// import helper functions
import { ISOToDateVancouverString, ISOToTimeString } from "~/helper/timeInputParser.js";

// NotShotForm Dummy component form
const NotShotForm = ({}) => {
 
  const notShotInfo = [
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Rain"
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Actor got injured"
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Thunderstorm and equipment got damaged"
    }
  ]

  return (
    <>
      {
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Scene No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                          Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Reason
                      </th>
                    </tr>
                  </thead>
                  {notShotInfo?.length > 0 && (
                    <tbody className="divide-y divide-gray-200">
                      {notShotInfo.map((row, idx) => (
                        <tr key={idx}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            
                            {/* From drop down from Production Scenes Array */}
                            {idx + 1}

                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ISOToDateVancouverString(row.date)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                           

                            <TimeInputField
                                label="not shot time"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.time)}
                              />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {row.reason}
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
                {notShotInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        No not shot scenes infromation found.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Button to Create New Line */}
            <div className="mt-2 flex justify-end gap-4 border-primary-base pt-4">
              <Button
                buttonType="Secondary"
                className="px-2 py-1"
              >
                Create New Line
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default NotShotForm;