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
        <div onClick={() => setIsOpen(true)} action="" className={`text-contrast-dark text-base font-normal `} >
          <div className="pb-2 border-b border-primary-base">
            <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2">
              <div className="grid col-span-2">Script Supervisor</div>
              <TextInputField className="grid col-span-4 font-bold" value={scriptSupervisor} />
              <div className="grid col-span-2">Data Wrangler</div>
              <TextInputField className="grid col-span-4 font-bold" value={dataWrangler} />
            </div>
          </div>

          <div className="grid grid-cols-6 grid-rows-4 gap-4 gap-y-2 pt-2">
            <div className="grid col-span-2"></div>
            <div className="font-bold">A Cam</div>
            <div className="font-bold">B Cam</div>
            <div className="font-bold">C Cam</div>
            <div className="font-bold">A Sound</div>
            <div className="grid col-span-2 font-bold">Previously</div>
            <TextInputField key={`aCamPreviously-${aCamPreviously ?? 0}`} maxLength="3" defaultValue={aCamPreviously} />
            <TextInputField key={`bCamPreviously-${bCamPreviously ?? 0}`} maxLength="3" defaultValue={bCamPreviously} />
            <TextInputField key={`cCamPreviously-${cCamPreviously ?? 0}`} maxLength="3" defaultValue={cCamPreviously} />
            <TextInputField key={`aSoundPreviously-${aSoundPreviously ?? 0}`} maxLength="3" defaultValue={aSoundPreviously} />
            <div className="grid col-span-2 font-bold">Today</div>
            <TextInputField
              key={`aCamToday-${aCamToday ?? 0}`}
              maxLength="3" defaultValue={aCamToday} />
            <TextInputField
              key={`bCamToday-${bCamToday ?? 0}`}
              maxLength="3" defaultValue={bCamToday} />
            <TextInputField
              key={`cCamToday-${cCamToday ?? 0}`}
              maxLength="3" defaultValue={cCamToday} />
            <TextInputField
              key={`aSoundToday-${aSoundToday ?? 0}`}
              maxLength="3" defaultValue={aSoundToday} />

            <div className="grid col-span-2 font-bold">To Date</div>
            <TextInputField

              key={`aCamToDate-${aCamToDate ?? 0}`}
              maxLength="3" defaultValue={aCamToDate} />
            <TextInputField
              key={`bCamToDate-${bCamToDate ?? 0}`}
              maxLength="3" defaultValue={bCamToDate} />
            <TextInputField
              key={`cCamToDate-${cCamToDate ?? 0}`}
              maxLength="3" defaultValue={cCamToDate} />
            <TextInputField
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