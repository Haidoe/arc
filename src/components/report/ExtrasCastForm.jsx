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
import {
  ISOToTimeString,
} from "~/helper/timeInputParser.js";

// ExtrasCastForm Dummy component form
const ExtrasCastForm = ({ }) => {
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
      {
        <div>
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y text-base text-contrast-dark divide-primary-base">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Notes
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Schedule
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left "
                      >
                        Rate
                      </th>
                      <th
                        scope="col"
                        className="relative min-w-[60px] pb-3.5 pl-3 pr-4 sm:pr-0 text-contrast-dark"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  {extrasCastInfo?.length > 0 && (
                    <tbody className="divide-y divide-gray-200 text-base  text-contrast-dark">
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
                                label="schedule in"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.in)}
                              />
                              <TimeInputField
                                label="schedule out"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.out)}
                              />
                              <TimeInputField
                                label="meal break"
                                isReadyOnly={true}
                                value={ISOToTimeString(row.schedule.meal)}
                              />
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 ">
                            ${row.schedule.rate}
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-0">
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
                {extrasCastInfo?.length == 0 && (
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
            <div className="mt-2 flex justify-end gap-4 border-primary-base pt-4">
              <Button buttonType="Secondary" className="px-2 py-1">
                Create New Line
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ExtrasCastForm;
