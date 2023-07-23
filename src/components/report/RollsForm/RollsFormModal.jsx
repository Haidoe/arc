import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Components
import Modal from "~/components/Modal";
import Accordion from "../Accordion";
import TextInputField from "~/components/TextInputField";
import Button from "~/components/Button";

//redux
import { updateRolls } from "~/redux/features/ProductionReportSlice";
import { updateProductionReportById } from "~/service/production";

const RollsFormModal = ({ isOpen, onClose }) => {
  // // Get productionId from URL
  // const router = useRouter();
  // const { productionId } = router.query;

  // //Get rolls previously from api
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/production/${productionId}/rollsInfo`
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         setRollsData(data);

  //       } else {
  //         throw new Error("Error fetching scene progress data");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       console.log("done");
  //     }
  //   };

  //   fetchData();
  // }, [productionId]);

  //redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);

  //For default value of the input field
  const rolls = data.rolls;

  //rolls aCam
  const aCamToday = rolls.entries.aCam.today || "";

  //rolls bCam
  const bCamToday = rolls.entries.bCam.today || "";

  //rolls cCam
  const cCamToday = rolls.entries.cCam.today || "";

  //rolls aSound
  const aSoundToday = rolls.entries.aSound.today || "";

  //for ref
  //rolls aCam
  const aCamTodayRef = useRef(aCamToday);

  //rolls bCam
  const bCamTodayRef = useRef(bCamToday);

  //rolls cCam
  const cCamTodayRef = useRef(cCamToday);

  //rolls aSound
  const aSoundTodayRef = useRef(aSoundToday);

  //for redux update
  const handleReduxUpdate = () => {
    let rolls = {
      ...data.rolls,
      entries: {
        aCam: {
          today: parseInt(aCamTodayRef.current.value ?? 0),
        },
        bCam: {
          today: parseInt(bCamTodayRef.current.value ?? 0),
        },
        cCam: {
          today: parseInt(cCamTodayRef.current.value ?? 0),
        },
        aSound: {
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
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <div className="mx-[-25vw] w-[85vw] lg:w-[50vw]">
        <Accordion
          title="Rolls"
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
          onClose={() => onClose()}
        >
          <form action="" className={`text-base font-bold text-contrast-dark `}>
            {/* <div className="border-b border-primary-base pb-2">
              <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2">
                <div className="col-span-2 grid">Script Supervisor</div>
                <TextInputField
                  placeholder="Please input the name."
                  className="col-span-4 grid"
                  ref={scriptSupervisorRef}
                  defaultValue={scriptSupervisor}
                />
                <div className="col-span-2 grid">Data Wrangler</div>
                <TextInputField
                  placeholder="Please input the name."
                  className="col-span-4 grid"
                  ref={dataWranglerRef}
                  defaultValue={dataWrangler}
                />
              </div>
            </div> */}

            <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2 pt-2">
              <div className="col-span-2 grid"></div>
              <div className="font-bold">A Cam</div>
              <div className="font-bold">B Cam</div>
              <div className="font-bold">C Cam</div>
              <div className="font-bold">A Sound</div>

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
            {/* Action btns */}
            <div className="mt-8 flex justify-end gap-4 py-4">
              {/* Button to cancel */}
              <Button
                buttonType="Secondary"
                className="py-2 font-bold lg:px-8 lg:py-3"
                onClick={onClose}
              >
                Cancel
              </Button>

              {/* Button to save modal */}
              <Button
                buttonType="Primary"
                className="py-2 font-bold lg:px-8 lg:py-3"
                onClick={handleReduxUpdate}
              >
                Save
              </Button>
            </div>
          </form>
        </Accordion>
      </div>
    </Modal>
  );
};

export default RollsFormModal;
