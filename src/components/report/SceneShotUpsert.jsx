import Button from "~/components/Button";
import { useState, useRef, useEffect } from "react";
import DropDown from "~/components/global/DropDown.jsx";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateShotScene } from "~/redux/features/ProductionReportSlice";
import TextInputField from "../TextInputField";
import NumberInputField from "../NumberInputField";
import { updateProductionReportById } from "~/service/production";

// status drop down
const dayOrNightArray = [{ name: "D" }, { name: "N" }];

// api to call scene progress
async function sceneProgressApi(productionId) {
// handles pages/api/production/[id]/scene-progress
  
  const response = await fetch(`/api/production/${productionId}/scene-progress`);
  const data = await response.json();
  return data;
  
}

// handles add or update to in the modal
const ScenesShotUpsert = ({ idx, closeModal, productionInfo }) => {
  const formRef = useRef(null);

  // =======================> Resources

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);
  const scenesShot = useSelector(
    (state) => state.productionReport.data.shotScene
  );

  const isUpdate = idx !== undefined ? true : false;
  const allScenesArray = productionInfo.scenes;

  const allScenes_custom = allScenesArray.map((item, idx) => {
    return {
      name: idx + 1,
      page: item,
    };
  });

  const [allScenes, setAllScenes] = useState(allScenes_custom);

  // =======================> Effects

  useEffect(() => {
    const updatedScenes = [...allScenes];
    sceneProgressApi(productionInfo.id).then(({sceneProgressArray}) => {
      
      const pagesShot = sceneProgressArray.map((item, idx) => {
        updatedScenes[idx].pagesShot = item.completed;
        return {completed: item.completed}
       });      
      // console.log(pagesShot);

      setAllScenes(updatedScenes);

    });
  }, []);



  // =======================> Initial Values

  function sceneNumberIdx(sceneNumber) {
    const idx = allScenes.findIndex((item) => item.name === sceneNumber);
    return idx;
  }

  // scene number
  const number_iv = isUpdate ? scenesShot[idx].number : 1;
  const numberIdx = isUpdate ? sceneNumberIdx(number_iv) : 0;

  // set
  const set_iv = isUpdate ? scenesShot[idx].set : "";

  // location
  const location_iv = isUpdate ? scenesShot[idx].location : "";

  // casts
  const casts_iv = isUpdate ? scenesShot[idx].casts.join(",") : "";

  // day or night
  const dayOrNight_iv = isUpdate
    ? { name: scenesShot[idx].dayOrNight }
    : dayOrNightArray[0];

  // page today
  const pagesToday_iv = isUpdate ? scenesShot[idx].pagesToday : 0;

  // =======================> States for Drop Downs
  // set selected number
  const [selectedNumber, setSelectedNumber] = useState(allScenes[numberIdx]);

  // day or night drop down
  const [selectedDayOrNight, setSelectedDayOrNight] = useState(dayOrNight_iv);

  // ======================> Refs for other fields

  const set = useRef(set_iv);
  const location = useRef(location_iv);
  const casts = useRef(casts_iv);
  const pagesToday = useRef(pagesToday_iv);

  // ======================> Event Handlers

  // data handlers
  function onUpdateHandler() {
    // prepare row

    const row = {
      number: selectedNumber.name,
      set: set.current.value,
      location: location.current.value,
      casts: casts.current.value.split(","),
      dayOrNight: selectedDayOrNight.name,
      pages: selectedNumber.page ? parseInt(selectedNumber.page) : 0,
      pagesShot: selectedNumber.pagesShot
        ? parseInt(selectedNumber.pagesShot)
        : 0,
      pagesToday: pagesToday.current.value
        ? parseInt(pagesToday.current.value)
        : 0,
    };

    const allRows = [...scenesShot];

    allRows[idx] = row;

    // pass to redux
    dispatch(updateShotScene(allRows));

    try {
      updateProductionReportById({
        ...data,
        shotScene: allRows,
      });
    } catch (error) {
      console.error("Scenes Shot Update Error: ", error);
    }
  }

  function onAddHandler() {
    const row = {
      number: selectedNumber.name,
      set: set.current.value,
      location: location.current.value,
      casts: casts.current.value.split(","),
      dayOrNight: selectedDayOrNight.name,
      pages: selectedNumber.page ? parseInt(selectedNumber.page) : 0,
      pagesShot: selectedNumber.pagesShot
      ? parseInt(selectedNumber.pagesShot)
      : 0,
      pagesToday: pagesToday.current.value
        ? parseInt(pagesToday.current.value)
        : 0,
    };

    const allRows = [...scenesShot, row];

    // pass to redux
    dispatch(updateShotScene(allRows));

    try {
      updateProductionReportById({
        ...data,
        shotScene: allRows,
      });
    } catch (error) {
      console.error("Scenes Shot Add Error: ", error);
    }
  }

  // modal handlers
  function saveModalHandler() {
    if (isUpdate) {
      // to update
      onUpdateHandler();
      closeModal();
    } else {
      onAddHandler();
      closeModal();
    }
  }

  function triggerSaveHandleModal() {
    // Trigger the form validation
    const isFormValid = formRef.current.reportValidity();
    if (isFormValid) {
      saveModalHandler();
    }
  }

  const modalHeightClass = " h-[300px]";

  return (
    <>
      <div>
        <div className={modalHeightClass}>
          <form ref={formRef}>
            <div className="min-h-[200px] overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-primary-base text-base text-contrast-dark">
                  <thead className=" font-bold">
                    <tr>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Scene No.
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Set
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Location
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Cast
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        D/N
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Pages
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Pages Shot
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left ">
                        Pages Today
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-contrast-lighter text-base text-contrast-dark">
                    <tr>
                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Drop Down of Scene Number */}
                        <DropDown
                          width="small"
                          people={allScenes}
                          selected={selectedNumber}
                          setSelected={setSelectedNumber}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Set Name */}
                        <TextInputField
                          className="rounded-sm border border-gray-500 px-2 py-2"
                          label="Set Name"
                          defaultValue={set_iv}
                          required={true}
                          ref={set}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Location */}
                        <TextInputField
                          className="rounded-sm border border-gray-500 px-2 py-2"
                          label="Location"
                          defaultValue={location_iv}
                          required={true}
                          ref={location}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Cast */}
                        <TextInputField
                          className="rounded-sm border border-gray-500 px-2 py-2"
                          label="Cast"
                          defaultValue={casts_iv}
                          required={true}
                          ref={casts}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO D/N */}
                        <DropDown
                          width="small"
                          people={dayOrNightArray}
                          selected={selectedDayOrNight}
                          setSelected={setSelectedDayOrNight}
                        />
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Pages */}
                        {selectedNumber.page}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Page Shot */}
                        {selectedNumber.pagesShot}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 ">
                        {/* TODO Page Today */}
                        <NumberInputField
                          className="rounded-sm border border-gray-500 px-2 py-2"
                          label="Page Today"
                          defaultValue={pagesToday_iv}
                          ref={pagesToday}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4 py-4">
            {/* Button to cancel */}
            <Button
              buttonType="Secondary"
              className="px-4 py-2 lg:px-8 lg:py-3"
              onClick={closeModal}
            >
              Cancel
            </Button>
            {/* Button to save modal */}
            <Button
              buttonType="Secondary"
              className="px-4 py-2 lg:px-8 lg:py-3"
              onClick={triggerSaveHandleModal}
            >
              {isUpdate ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScenesShotUpsert;
