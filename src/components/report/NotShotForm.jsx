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
const NotShotForm = ({ }) => {

  const notShotInfo = [
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Rain"
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Actor injured"
    },
    {
      date: "2023-07-02T22:00:00.000Z",
      time: "2023-07-02T22:00:00.000Z",
      reason: "Equipment lost"
    }
  ]

  return (
    <>
      {
        <div>
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-primary-base">
                  <thead className="text-base font-bold text-contrast-dark">
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Scene No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Reason
                      </th>
                      <th
                        scope="col"
                        className="relative min-w-[60px] py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  {notShotInfo?.length > 0 && (
                    <tbody className="divide-y text-base text-contrast-dark divide-gray-200">
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
                              label="not shot time"
                              isReadyOnly={true}
                              value={ISOToTimeString(row.time)}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.reason}
                          </td>
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
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {/* Else show empty message with button */}
                {notShotInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="">
                        No not shot scenes infromation found.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Button to Create New Line */}
            <div className="mt-2 flex justify-end gap-4 border-primary-light pt-4">
              <Button
                buttonType="Secondary"
                className="px-4 py-[15px]"
              >
                <div className="text-center border-primary-light text-sm font-bold">Create New Line</div>
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default NotShotForm;
