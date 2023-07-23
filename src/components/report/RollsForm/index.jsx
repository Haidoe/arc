//react-redux
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

//components
import TextInputField from '~/components/TextInputField'
import Accordion from '../Accordion'
import RollsFormModal from './RollsFormModal'
import LoadingSpinner from "~/components/Loading";

const RollsForm = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rollsData, setRollsData] = useState(null);

  // Get productionId from URL
  const router = useRouter();
  const { productionId } = router.query;

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
        console.log(error);
      } finally {
        console.log("done");
      }
    };

    fetchData();
  }, [productionId]);

  console.log(rollsData, "rollsDatafromapi")

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
          <div onClick={() => setIsOpen(true)} action="" className={` text-contrast-dark text-base font-bold`} >
            <div className="pb-2 border-b  border-primary-base">
              <div className="grid text-base text-bold grid-cols-6 grid-rows-2 gap-4 gap-y-2">
                <p tabIndex="-1" className="grid col-span-2">Script Supervisor</p>
                <TextInputField tabIndex="-1" className="grid col-span-4" placeholder="Please input the name." value={scriptSupervisor} />
                <p tabIndex="-1" className=" grid col-span-2">Data Wrangler</p>
                <TextInputField tabIndex="-1" className="grid col-span-4" placeholder="Please input the name." value={dataWrangler} />
              </div>
            </div>

            <div className=" text-contrast-dark">
              <div className="grid grid-cols-6 grid-rows-3 gap-4 py-4">
                <div className="grid col-span-2"></div>
                <p tabIndex="-1" className="font-bold">A Cam</p>
                <p tabIndex="-1" className="font-bold">B Cam</p>
                <p tabIndex="-1" className="font-bold">C Cam</p>
                <p tabIndex="-1" className="font-bold">A Sound</p>
                <p tabIndex="-1" className="grid col-span-2 font-bold">Previously</p>
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aCamPreviously-${aCamPreviously ?? 0}`}
                  maxLength="3"
                  defaultValue={aCamPreviously} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`bCamPreviously-${bCamPreviously ?? 0}`}
                  maxLength="3"
                  defaultValue={bCamPreviously} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`cCamPreviously-${cCamPreviously ?? 0}`}
                  maxLength="3"
                  defaultValue={cCamPreviously} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aSoundPreviously-${aSoundPreviously ?? 0}`}
                  maxLength="3"
                  defaultValue={aSoundPreviously} />
                <p className="grid col-span-2 font-bold">Today</p>
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aCamToday-${aCamToday ?? 0}`}
                  maxLength="3" defaultValue={aCamToday} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`bCamToday-${bCamToday ?? 0}`}
                  maxLength="3" defaultValue={bCamToday} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`cCamToday-${cCamToday ?? 0}`}
                  maxLength="3" defaultValue={cCamToday} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aSoundToday-${aSoundToday ?? 0}`}
                  maxLength="3" defaultValue={aSoundToday} />
              </div>

              <div className="grid grid-cols-6 grid-rows-1 gap-4 pt-4 border-t border-primary-base">
                <p className="grid col-span-2 font-bold">To Date</p>
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aCamToDate-${aCamToDate ?? 0}`}
                  maxLength="3" defaultValue={aCamToDate} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`bCamToDate-${bCamToDate ?? 0}`}
                  maxLength="3" defaultValue={bCamToDate} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`cCamToDate-${cCamToDate ?? 0}`}
                  maxLength="3" defaultValue={cCamToDate} />
                <TextInputField
                  tabIndex="-1"
                  placeholder="0"
                  key={`aSoundToDate-${aSoundToDate ?? 0}`}
                  maxLength="3" defaultValue={aSoundToDate} />
              </div>
            </div>
          </div >
        ) : (
          //make a div with a loading spinner in the center
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}
      </Accordion>

      <RollsFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>

  )
}

export default RollsForm


// Script Supervisor Harvey Spector
// Data Wrangler 	John H.

// A Cam B Cam A sound B Sound
// Previously
// Today
// To Date