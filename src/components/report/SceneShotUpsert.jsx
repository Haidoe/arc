import Button from "~/components/Button";
import { useState, useRef } from "react";
import DropDown from "~/components/global/DropDown.jsx";

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateShotScene } from "~/redux/features/ProductionReportSlice";
import TextInputField from "../TextInputField";
import NumberInputField from "../NumberInputField";
import { updateProductionReportById } from "~/service/production";

// status drop down
const dayOrNightArray = [{ name: "D" }, { name: "N" }];

// handles add or update to in the modal
const ScenesShotUpsert = ({ idx, closeModal, productionInfo }) => {
  // =======================> Resources

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);
  const scenesShot = useSelector(
    (state) => state.productionReport.data.shotScene
  );

  const isUpdate = idx !== undefined ? true : false;
  const allScenesArray = productionInfo.scenes;

  const allScenes = allScenesArray.map((item, idx) => {
    return {
      name: idx + 1,
      page: item,
    };
  });

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

  // // pages
  // const pages_iv = isUpdate ? scenesShot[idx].pages : 0;

  // pages shot
  const pagesShot_iv = isUpdate ? scenesShot[idx].pagesShot : 0;

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

  const pagesShot = useRef(pagesShot_iv);
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
      pages: parseInt(selectedNumber.page),
      pagesShot: parseInt(pagesShot.current.value),
      pagesToday: parseInt(pagesToday.current.value),
    };

    const allRows = [...scenesShot];

    allRows[idx] = row;

    // pass to redux
    dispatch(updateShotScene(allRows));

    updateProductionReportById({
      ...data,
      shotScene: allRows,
    });
  }

  function onAddHandler() {
    const row = {
      number: selectedNumber.name,
      set: set.current.value,
      location: location.current.value,
      casts: casts.current.value.split(","),
      dayOrNight: selectedDayOrNight.name,
      pages: parseInt(selectedNumber.page),
      pagesShot: parseInt(pagesShot.current.value),
      pagesToday: parseInt(pagesToday.current.value),
    };

    const allRows = [...scenesShot, row];

    // pass to redux
    dispatch(updateShotScene(allRows));

    updateProductionReportById({
      ...data,
      shotScene: allRows,
    });
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

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="">
          <div className="-mx-4 -my-2 min-h-[200px] overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Scene No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Set
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Cast
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      D/N
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Pages
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Pages Shot
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Pages Today
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Drop Down of Scene Number */}
                      <DropDown
                        width="small"
                        people={allScenes}
                        selected={selectedNumber}
                        setSelected={setSelectedNumber}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Set Name */}
                      <TextInputField
                        className="rounded-sm border border-gray-500 px-2 py-2"
                        label="Set Name"
                        defaultValue={set_iv}
                        ref={set}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Location */}
                      <TextInputField
                        className="rounded-sm border border-gray-500 px-2 py-2"
                        label="Location"
                        defaultValue={location_iv}
                        ref={location}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Cast */}
                      <TextInputField
                        className="rounded-sm border border-gray-500 px-2 py-2"
                        label="Cast"
                        defaultValue={casts_iv}
                        ref={casts}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO D/N */}
                      <DropDown
                        width="small"
                        people={dayOrNightArray}
                        selected={selectedDayOrNight}
                        setSelected={setSelectedDayOrNight}
                      />
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Pages */}
                      {selectedNumber.page}
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {/* TODO Page Shot */}
                      <NumberInputField
                        className="rounded-sm border border-gray-500 px-2 py-2"
                        label="Page Shot"
                        defaultValue={pagesShot_iv}
                        ref={pagesShot}
                      />
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
          {/* Action Buttons */}
          <div className="mt-2 flex justify-end gap-4 border-primary-base pt-4">
            {/* Button to cancel */}
            <Button
              buttonType="Secondary"
              className="px-2 py-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
            {/* Button to save modal */}
            <Button
              buttonType="Secondary"
              className="px-2 py-1"
              onClick={saveModalHandler}
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
