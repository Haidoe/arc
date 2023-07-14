// accordion crud add or update row modal
import Modal from "~/components/Modal";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Chevron from "~/assets/icons/Chevron.svg";

// import upserts
import CastTimeLogUpsert from "~/components/report/CastTimeLogUpsert";

const AccordionCrudModalAdd = ({
  title,
  type,
  selectedIndex,
  modalWidth,
  hideAddModal,
  productionInfo,
}) => {
  function closeModal() {
    hideAddModal();
  }

  const modalWidthObj = {
    50: "w-[50vw] mx-[-25vw]",
    75: "w-[75vw] mx-[-37.5vw]",
    90: "w-[90vw] mx-[-45vw]",
  };

  const modalWidthClass = modalWidthObj[modalWidth] || "";

  return (
    <>
      {/* Accordion in Modal */}
      <Modal isOpen={true} onClose={closeModal}>
        <div className={modalWidthClass}>
          {/* Accordion */}

          <div className="w-full">
            <div className={`mx-auto w-full rounded-2xl`}>
              <Disclosure defaultOpen={true}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`pointer-events-none flex w-full justify-between rounded-sm bg-primary-light px-4 py-2  text-left font-medium text-arc hover:bg-primary-base focus:outline-none focus-visible:bg-primary-base focus-visible:ring focus-visible:ring-opacity-75`}
                    >
                      <span>
                        {title ||
                          (selectedIndex ? "Update Row" : "Add new Row")}
                      </span>

                      <div className="items-center sm:flex">
                        {/* Logo */}
                        <Image
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-6 w-6 text-arc`}
                          src={Chevron}
                          alt="Logo"
                        />
                      </div>
                    </Disclosure.Button>
                    <Disclosure.Panel
                      className={`bg-arc px-4 pb-4 pt-4 text-sm text-gray-500`}
                    >
                      <div>
                        {/* Conditionally rendering upserts */}
                        {type == "castTimeLog" && (
                          <CastTimeLogUpsert
                            closeModal={closeModal}
                            idx={selectedIndex}
                            productionInfo={productionInfo}
                          />
                        )}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccordionCrudModalAdd;
