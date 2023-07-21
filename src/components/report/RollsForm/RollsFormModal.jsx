import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import Modal from "~/components/Modal";
import Accordion from "../Accordion";
import TextInputField from "~/components/TextInputField";

//redux
import { updateRolls } from "~/redux/features/ProductionReportSlice";
import { updateProductionReportById } from "~/service/production";

const RollsFormModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);

  //For default value of the input field
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

  //for ref

  //crew
  const scriptSupervisorRef = useRef(scriptSupervisor);
  const dataWranglerRef = useRef(dataWrangler);

  //rolls aCam
  const aCamPreviouslyRef = useRef(aCamPreviously);
  const aCamTodayRef = useRef(aCamToday);

  //rolls bCam
  const bCamPreviouslyRef = useRef(bCamPreviously);
  const bCamTodayRef = useRef(bCamToday);

  //rolls cCam
  const cCamPreviouslyRef = useRef(cCamPreviously);
  const cCamTodayRef = useRef(cCamToday);

  //rolls aSound
  const aSoundPreviouslyRef = useRef(aSoundPreviously);
  const aSoundTodayRef = useRef(aSoundToday);

  //for redux update
  const handleReduxUpdate = () => {
    let rolls = {
      ...data.rolls,
      scriptSupervisor: scriptSupervisorRef.current.value,
      dataWrangler: dataWranglerRef.current.value,
      entries: {
        aCam: {
          previously: parseInt(aCamPreviouslyRef.current.value ?? 0),
          today: parseInt(aCamTodayRef.current.value ?? 0),
        },
        bCam: {
          previously: parseInt(bCamPreviouslyRef.current.value ?? 0),
          today: parseInt(bCamTodayRef.current.value ?? 0),
        },
        cCam: {
          previously: parseInt(cCamPreviouslyRef.current.value ?? 0),
          today: parseInt(cCamTodayRef.current.value ?? 0),
        },
        aSound: {
          previously: parseInt(aSoundPreviouslyRef.current.value ?? 0),
          today: parseInt(aSoundTodayRef.current.value ?? 0),
        },
      },
    };

    dispatch(updateRolls(rolls));

    updateProductionReportById({
      ...data,
      rolls,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReduxUpdate}>
      <div className="mx-[-25vw] w-[50vw]">
        <Accordion
          title="Rolls"
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
        >
          <form
            action=""
            className={`text-base font-bold text-contrast-dark `}
          >
            <div className="border-b border-primary-base pb-2">
              <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2">
                <div className="col-span-2 grid">Script Supervisor</div>
                <TextInputField
                  placeholder="Name"
                  className="col-span-4 grid"
                  ref={scriptSupervisorRef}
                  defaultValue={scriptSupervisor}
                />
                <div className="col-span-2 grid">Data Wrangler</div>
                <TextInputField
                  placeholder="Name"
                  className="col-span-4 grid"
                  ref={dataWranglerRef}
                  defaultValue={dataWrangler}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 grid-rows-3 gap-4 gap-y-2 pt-2">
              <div className="col-span-2 grid"></div>
              <div className="font-bold">A Cam</div>
              <div className="font-bold">B Cam</div>
              <div className="font-bold">C Cam</div>
              <div className="font-bold">A Sound</div>
              <div className="col-span-2 grid font-bold">Previously</div>
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={aCamPreviouslyRef}
                defaultValue={aCamPreviously}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={bCamPreviouslyRef}
                defaultValue={bCamPreviously}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={cCamPreviouslyRef}
                defaultValue={cCamPreviously}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={aSoundPreviouslyRef}
                defaultValue={aSoundPreviously}
              />
              <div className="col-span-2 grid font-bold">Today</div>
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={aCamTodayRef}
                defaultValue={aCamToday}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={bCamTodayRef}
                defaultValue={bCamToday}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={cCamTodayRef}
                defaultValue={cCamToday}
              />
              <TextInputField
                placeholder="0"
                maxLength="3"
                ref={aSoundTodayRef}
                defaultValue={aSoundToday}
              />
            </div>
          </form>
        </Accordion>
      </div>
    </Modal>
  );
};

export default RollsFormModal;
