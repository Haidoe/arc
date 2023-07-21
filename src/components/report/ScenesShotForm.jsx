// react imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShotScene } from "~/redux/features/ProductionReportSlice";
import Image from "next/image";

// components
import Button from "~/components/Button";
import Delete from "~/assets/icons/Delete.svg";

// import edit and delete modals
import AccordionCrudModalAdd from "~/components/report/AccordionCrudModalAdd";
import ConfirmationModal from "~/components/global/ConfirmationModal";

// ScenesShotForm component form
const ScenesShotForm = ({ productionInfo }) => {
  // to show or hide the add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // to show or hide the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // selected index
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const dispatch = useDispatch();
  const shotSceneInfo = useSelector(
    (state) => state.productionReport.data.shotScene
  );

  // ================================> Form event functions
  function addClickHandler() {
    setSelectedIndex(undefined);
    setShowAddModal(true);
  }

  function rowClickHandler(event, idx) {
    event.preventDefault();
    // delete condition
    if (event.target.className.includes("icon-delete-row")) {
      setSelectedIndex(idx);
      setShowDeleteModal(true);
    } else {
      // edit condition
      setSelectedIndex(idx);
      setShowAddModal(true);
    }
  }

  // ================================> Modal event functions

  function hideAddModal() {
    setSelectedIndex(undefined);
    setShowAddModal(false);
  }

  // on modal close set selected index to undefined

  function deleteConfirmationHandler() {
    const updatedRows = shotSceneInfo.filter((item, i) => i !== selectedIndex);
    console.log(updatedRows)
    // dispatch(updateShotScene(updatedRows));
    setSelectedIndex(undefined);
    setShowDeleteModal(false);
  }

  return (
    <>
      {showAddModal && (
        <AccordionCrudModalAdd
          type="shotScene"
          modalWidth={90}
          hideAddModal={hideAddModal}
          selectedIndex={selectedIndex}
          productionInfo={productionInfo}
        />
      )}

      {showDeleteModal && (
        <ConfirmationModal
          heading="Delete Confirmation"
          message="Are you sure you want to delete?"
          cancelHandler={() => setShowDeleteModal(false)}
          actionHandler={(selectedIndex) => deleteConfirmationHandler(selectedIndex)}
        />
      )}

      {
        <div className="">
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-primary-base text-base text-fold text-contrast-dark">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Scene No.
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Set
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Cast
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        D/N
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Pages
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Pages Shot
                      </th>
                      <th
                        scope="col"
                        className="px-3 pb-3.5 text-left"
                      >
                        Pages Today
                      </th>
                      <th
                        scope="col"
                        className="relative min-w-[60px] pb-3.5 pl-3 pr-4 sm:pr-0 text-contrast-dark"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  {shotSceneInfo?.length > 0 && (
                    <tbody className="divide-y divide-gray-200 text-base text-contrast-dark">
                      {shotSceneInfo.map((row, idx) => (
                        <tr key={idx} onClick={(e) => rowClickHandler(e, idx)}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3  font-medium sm:pl-0">

                            {/* From drop down from Production Scenes Array */}
                            {row.number}

                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.set}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.casts.join(", ")}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.location}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.dayOrNight}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.pages}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.pagesShot}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 ">
                            {row.pagesToday}
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
                {shotSceneInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="">
                        No scenes shot infromation found.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Button to Create New Line */}
            <div className="mt-2 flex justify-end gap-4 border-primary-light pt-4">
              <Button
                onClick={addClickHandler}
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

export default ScenesShotForm;
