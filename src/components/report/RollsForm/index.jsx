//react-redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//components
import TextInputField from "~/components/TextInputField";
import Accordion from "../Accordion";
import RollsFormModal from "./RollsFormModal";
import LoadingSpinner from "~/components/Loading";

const RollsForm = ({ productionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rollsData, setRollsData] = useState(null);

  //Get rolls previously from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/production/${productionId}/rollsInfo`
        );

        if (response.ok) {
          const data = await response.json();
          setRollsData(data);
        } else {
          throw new Error("Error fetching scene progress data");
        }
      } catch (error) {
        // console.log(error);
      } finally {
        // console.log("done");
      }
    };

    fetchData();
  }, []);

  // console.log(rollsData, "rollsDatafromapi")

  // //Get script supervisor and data wrangler from api
  const scriptSupervisorFromApi = rollsData ? rollsData.scriptSupervisor : "";
  const dataWranglerFromApi = rollsData ? rollsData.dataWrangler : "";

  //manage data from redux
  const data = useSelector((state) => state.productionReport.data);
  const rolls = data.rolls;

  // //crew
  const scriptSupervisor = scriptSupervisorFromApi;
  const dataWrangler = dataWranglerFromApi ? dataWranglerFromApi : "";

  //rolls aCam
  const aCamPreviously = rollsData ? rollsData.aCamTotal : "";
  const aCamToday = rolls.entries.aCam.today || "";
  //aCamToDate is a sum of aCamPreviously and aCamToday
  const aCamToDate = Number(aCamPreviously) + Number(aCamToday);

  //rolls bCam
  const bCamPreviously = rollsData ? rollsData.bCamTotal : "";
  const bCamToday = rolls.entries.bCam.today || "";
  const bCamToDate = Number(bCamPreviously) + Number(bCamToday);

  //rolls cCam
  const cCamPreviously = rollsData?.cCamTotal ?? "";
  const cCamToday = rolls.entries.cCam.today || "";
  const cCamToDate = Number(cCamPreviously) + Number(cCamToday);

  //rolls aSound
  const aSoundPreviously = rollsData ? rollsData.aSoundTotal : "";
  const aSoundToday = rolls.entries.aSound.today || "";
  const aSoundToDate = Number(aSoundPreviously) + Number(aSoundToday);

  // console.log(scriptSupervisor + "scriptSupervisor")
  // console.log(dataWrangler + "dataWrangler")
  // console.log(aCamPreviously + "aCamPreviously")

  return (
    <>
      <Accordion title="Rolls" defaultOpen={true}>
        {rollsData ? (
          <div
            onClick={() => setIsOpen(true)}
            action=""
            className={` text-base text-contrast-dark`}
          >
            <div className="border-b border-primary-base pb-3">
              <div className="grid grid-cols-6 grid-rows-2 gap-x-4 gap-y-1 pb-1 text-base">
                <p className="col-span-2 grid font-bold">Script Supervisor</p>
                <p className="col-span-4 grid">{scriptSupervisor}</p>
                <p className="col-span-2 grid font-bold">Data Wrangler</p>
                <p className="col-span-4 grid">{dataWrangler}</p>
              </div>
            </div>

            <div className=" text-contrast-dark">
              <div className="grid grid-rows-3 gap-x-4 divide-y divide-contrast-lighter">
                <div className="grid grid-cols-6 gap-4 py-3.5">
                  <div className="col-span-2 grid"></div>
                  <p className="font-bold">A Cam</p>
                  <p className="font-bold">B Cam</p>
                  <p className="font-bold">C Cam</p>
                  <p className="font-bold">A Sound</p>
                </div>
                <div className="grid grid-cols-6 gap-4 py-3.5">
                  <p className="col-span-2 grid font-bold">Previously</p>
                  <p>{aCamPreviously}</p>
                  <p>{bCamPreviously}</p>
                  <p>{cCamPreviously}</p>
                  <p>{aSoundPreviously}</p>
                </div>
                <div className="grid grid-cols-6 gap-4 py-3.5">
                  <p className="col-span-2 grid font-bold">Today</p>
                  <TextInputField
                    tabIndex="-1"
                    placeholder="0"
                    key={`aCamToday-${aCamToday ?? 0}`}
                    maxLength="3"
                    defaultValue={aCamToday}
                    readOnly="true"
                  />
                  <TextInputField
                    tabIndex="-1"
                    placeholder="0"
                    key={`bCamToday-${bCamToday ?? 0}`}
                    maxLength="3"
                    defaultValue={bCamToday}
                    readOnly="true"
                  />
                  <TextInputField
                    tabIndex="-1"
                    placeholder="0"
                    key={`cCamToday-${cCamToday ?? 0}`}
                    maxLength="3"
                    defaultValue={cCamToday}
                    readOnly="true"
                  />
                  <TextInputField
                    tabIndex="-1"
                    placeholder="0"
                    key={`aSoundToday-${aSoundToday ?? 0}`}
                    maxLength="3"
                    defaultValue={aSoundToday}
                    readOnly="true"
                  />
                </div>
                <div className="grid grid-cols-6 gap-4 py-3.5 font-bold">
                  <p className="col-span-2 grid font-bold">To Date</p>
                  <p>{aCamToDate}</p>
                  <p>{bCamToDate}</p>
                  <p>{cCamToDate}</p>
                  <p>{aSoundToDate}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          //make a div with a loading spinner in the center
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </Accordion>

      <RollsFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default RollsForm;

// Script Supervisor Harvey Spector
// Data Wrangler 	John H.

// A Cam B Cam A sound B Sound
// Previously
// Today
// To Date
