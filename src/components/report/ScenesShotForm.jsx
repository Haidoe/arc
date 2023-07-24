// react imports
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShotScene } from "~/redux/features/ProductionReportSlice";
import Image from "next/image";

// components
import Button from "~/components/Button";
import Delete from "~/assets/icons/Delete.svg";
import Delete_grey from "~/assets/icons/Delete_grey.svg";
import Edit from "~/assets/icons/Edit.svg";
import Edit_grey from "~/assets/icons/Edit_grey.svg";

// import edit and delete modals
import AccordionCrudModalAdd from "~/components/report/AccordionCrudModalAdd";
import ConfirmationModal from "~/components/global/ConfirmationModal";
import { updateProductionReportById } from "~/service/production";

// ScenesShotForm component form
const ScenesShotForm = ({ productionInfo, isReadOnly }) => {
  // to show or hide the add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // to show or hide the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // selected index
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  // action btns hover states
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const [isEditHover, setIsEditHover] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(undefined);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.productionReport.data);
  const shotSceneInfo = data.shotScene;

  // ================================> Form event functions
  function addClickHandler() {
    setSelectedIndex(undefined);
    setShowAddModal(true);
  }

  function rowClickHandler(event, idx) {
    event.preventDefault();
    // delete condition
    console.log(event.target);
    if (event.target.className.includes("delete-row-btn")) {
      setSelectedIndex(idx);
      setShowDeleteModal(true);
    } else if (event.target.className.includes("edit-row-btn")) {
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
    dispatch(updateShotScene(updatedRows));
    setSelectedIndex(undefined);
    setShowDeleteModal(false);

    try {
      updateProductionReportById({
        ...data,
        shotScene: updatedRows,
      });
    } catch (error) {
      console.log("DELETING CAST TIME LOG ERROR: ", error);
    }
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
          actionHandler={(selectedIndex) =>
            deleteConfirmationHandler(selectedIndex)
          }
        />
      )}

      {
        <div className="">
          <div className="flow-root">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="text-fold min-w-full divide-y divide-primary-base text-base text-contrast-dark">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="pb-3.5 pl-4 pr-3 text-left sm:pl-0"
                      >
                        Scene No.
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Set
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Location
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Cast
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        D/N
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Pages
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Pages Shot
                      </th>
                      <th scope="col" className="px-3 pb-3.5 text-left">
                        Pages Today
                      </th>
                      {/* Hide this column if the form is read only */}
                      {!isReadOnly && (
                        <th
                          scope="col"
                          className="relative min-w-[60px] pb-3.5 pl-3 pr-4 text-contrast-dark sm:pr-0"
                        >
                          <span className="sr-only">Delete</span>
                        </th>
                      )}
                    </tr>
                  </thead>
                  {shotSceneInfo?.length > 0 && (
                    <tbody className="divide-y divide-contrast-lighter text-base text-contrast-dark">
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

                          {/* Hide this column if the form is read only */}
                          {!isReadOnly && (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right font-medium sm:pr-0">
                              <div className="flex flex-row gap-2">
                                {/* edit row btn */}
                                <div className="edit-row-btn-container">
                                  {isEditHover && hoverIdx == idx ? (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onMouseLeave={() => {
                                        setIsEditHover(false);
                                        setHoverIdx(undefined);
                                      }}
                                      src={Edit}
                                      alt="Delete icon"
                                    />
                                  ) : (
                                    <Image
                                      className={`edit-row-btn hover:cursor-pointer`}
                                      onMouseEnter={(e) => {
                                        setIsEditHover(true);
                                        setHoverIdx(idx);
                                      }}
                                      src={Edit_grey}
                                      alt="Edit icon"
                                    />
                                  )}

                                  <span className="sr-only">
                                    Edit Scene Row {idx + 1}
                                  </span>
                                </div>
                                {/* delete row btn */}
                                <div className="delete-row-btn-container">
                                  {isDeleteHover && hoverIdx == idx ? (
                                    <Image
                                      className={`delete-row-btn hover:cursor-pointer`}
                                      onMouseLeave={() => {
                                        setIsDeleteHover(false);
                                        setHoverIdx(undefined);
                                      }}
                                      src={Delete}
                                      alt="Delete icon"
                                    />
                                  ) : (
                                    <Image
                                      className={`delete-row-btn hover:cursor-pointer`}
                                      onMouseEnter={() => {
                                        setIsDeleteHover(true);
                                        setHoverIdx(idx);
                                      }}
                                      src={Delete_grey}
                                      alt="Delete icon"
                                    />
                                  )}
                                  <span className="sr-only">
                                    Delete Scene Row {idx + 1}
                                  </span>
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {/* Else show empty message with button */}
                {shotSceneInfo?.length == 0 && (
                  <div className="mt-4 flex flex-col items-center gap-4 border-primary-base pt-4">
                    <div>
                      <p className="">No scenes shot infromation found.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Button to Create New Line */}
            {/* Hide this button if the form is read only */}
            {!isReadOnly && (
              <div className="mt-2 flex justify-end gap-4 py-4">
                <Button
                  onClick={addClickHandler}
                  buttonType="Secondary"
                  className="border-2 px-4 py-2 font-bold lg:px-8 lg:py-3"
                >
                  Create New Line
                </Button>
              </div>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default ScenesShotForm;
