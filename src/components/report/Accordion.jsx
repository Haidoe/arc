import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Chevron from "~/assets/icons/Chevron.svg";
import Cancel from "~/assets/icons/Cancel.svg";


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
  onClose
}) => {


  // handle readOnlyState of accordion
  const handlePanelClick = (event) => {
    if (readOnlyState) {
      event.stopPropagation();
      panelClick();
    }
  };

  // handle disclosure button keydown
  function handleDisclosureKeyDown(event) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
    }
  }

  function handleDisclosureHeaderClick(event) {
    if (event.target.className.includes("chevron-accordion-toggle")) {
      console.log('clicked toggle')
    } else {
      event.preventDefault();
    }
  }

  return (
    <div className="w-full">
      <div
        className={`mx-auto w-full rounded-2xl ${insideModal ? "report-modal " : ""
          }`}
      >
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                tabIndex="-1"
                onKeyDown={handleDisclosureKeyDown}
                onClick={handleDisclosureHeaderClick}
                className={`flex w-full justify-between rounded-t-sm bg-primary-light px-4 py-2 text-left text-[16px] font-bold text-arc focus:outline-none focus-visible:bg-primary-base focus-visible:ring focus-visible:ring-opacity-75 ${insideModal ? "cursor-default" : "cursor-default md:pointer-events-none"
                  } `}
              >
                <span>{title || "Accordion Title"}</span>

                <div className="items-center sm:flex">
                  {/* Logo */}

                  {!insideModal && (<Image
                    className={`${open ? "transform" : "transform rotate-180"
                      } h-6 w-6 text-arc md:hidden cursor-pointer chevron-accordion-toggle`}
                    src={Chevron}
                    alt="Logo"
                  />)}

                  {insideModal && (
                    <Image
                      className={`cursor-pointer mt-1 h-4 w-4 text-arc`}
                      src={Cancel}
                      alt="cancel modal"
                      onClick={() => { onClose() }}
                    />
                  )}
                </div>
              </Disclosure.Button>

              <Disclosure.Panel
                onClick={handlePanelClick}
                className={`bg-arc px-4 py-6 text-sm text-contrast-dark`}
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
