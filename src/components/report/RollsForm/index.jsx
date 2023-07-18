//react-redux
import React, { useState } from "react";
import { useSelector } from "react-redux";

//components
import TextInputField from '~/components/TextInputField'
import Accordion from '../Accordion'
import RollsFormModal from './RollsFormModal'

const RollsForm = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);

  //manage data from redux
  const data = useSelector((state) => state.productionReport.data);
  const rolls = data.rolls;

  //crew
  const scriptSupervisor = rolls.scriptSupervisor ? rolls.scriptSupervisor : "";
  const dataWrangler = rolls.dataWrangler ? rolls.dataWrangler : "";

  //rolls aCam
  const aCamPreviously = rolls.entries.aCam.previously || "";
  const aCamToday = rolls.entries.aCam.today || "";
  //aCamToDate is a sum of aCamPreviously and aCamToday
  const aCamToDate = Number(aCamPreviously) + Number(aCamToday);

  //rolls bCam
  const bCamPreviously = rolls.entries.bCam.previously || "";
  const bCamToday = rolls.entries.bCam.today || "";
  const bCamToDate = Number(bCamPreviously) + Number(bCamToday);

  //rolls cCam
  const cCamPreviously = rolls.entries.cCam.previously || "";
  const cCamToday = rolls.entries.cCam.today || "";
  const cCamToDate = Number(cCamPreviously) + Number(cCamToday);

  //rolls aSound
  const aSoundPreviously = rolls.entries.aSound.previously || "";
  const aSoundToday = rolls.entries.aSound.today || "";
  const aSoundToDate = Number(aSoundPreviously) + Number(aSoundToday);

  // console.log(scriptSupervisor + "scriptSupervisor")
  // console.log(dataWrangler + "dataWrangler")
  // console.log(aCamPreviously + "aCamPreviously")

  return (
    <>
      <Accordion title="Rolls" defaultOpen={true}>
        <div onClick={() => setIsOpen(true)} action="" className={` text-contrast-dark`} >
          <div className="pb-2 border-b border-primary-base">
            <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2">
              <p tabIndex="-1" className="grid col-span-2">Script Supervisor</p>
              <TextInputField tabIndex="-1" className="grid col-span-4" placeholder="Name" value={scriptSupervisor} />
              <p tabIndex="-1" className="grid col-span-2">Data Wrangler</p>
              <TextInputField tabIndex="-1" className="grid col-span-4" placeholder="Name" value={dataWrangler} />
            </div>
          </div>

          <div className=" text-contrast-dark grid grid-cols-6 grid-rows-4 gap-4 gap-y-2 pt-2">
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
        </div >
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