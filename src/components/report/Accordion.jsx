import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Chevron from "~/assets/icons/Chevron.svg";

// Accordion Component: Wrapper for Disclosure
// title: string
// children: JSX.Element

const Accordion = ({
  title,
  children,
  defaultOpen,
  readOnlyState,
  panelClick,
  insideModal,
}) => {
  // handle readOnlyState of accordion
  const handlePanelClick = (event) => {
    if (readOnlyState) {
      event.stopPropagation();
      panelClick();
    }
  };

  return (
    <div className="w-full">
      <div className={`mx-auto w-full rounded-2xl ${insideModal ? "report-modal " : ""}`}>
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button className={`flex w-full justify-between rounded-sm bg-primary-light px-4 py-2 text-left  font-medium text-arc hover:bg-primary-base focus:outline-none focus-visible:bg-primary-base focus-visible:ring focus-visible:ring-opacity-75 ${insideModal ? "pointer-events-none" : ""} `}>
                <span>{title || "Accordion Title"}</span>

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
                onClick={handlePanelClick}
                className={`bg-arc px-4 pb-4 pt-4 text-sm text-gray-500`}
              >
                <div
                  className={`${readOnlyState ? "pointer-events-none" : ""}`}
                >
                  {children || "Accordion Content"}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
