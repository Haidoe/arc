import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Chevron from "~/assets/icons/Chevron.svg";

// Accordion Component: Wrapper for Disclosure
// title: string
// children: JSX.Element

const AccordionCrud = ({ title, children, defaultOpen }) => {
  // handle disclosure button keydown
  function handleDisclosureKeyDown(event) {
    console.log(event);
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
      <div className={`mx-auto w-full rounded-2xl`}>
        <Disclosure defaultOpen={defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button
                onKeyDown={handleDisclosureKeyDown}
                onClick={handleDisclosureHeaderClick}
                className={`flex w-full justify-between rounded-sm bg-primary-light px-4 py-2 text-left  font-medium text-arc focus:outline-none focus-visible:bg-primary-base focus-visible:ring focus-visible:ring-opacity-75 cursor-default`}
              >
                <span>{title || "Accordion Title"}</span>

                <div className="items-center sm:flex">
                  {/* Logo */}
                  <Image
                    className={`${open ? "transform" : "trasnform rotate-180"
                      } h-6 w-6 text-arc md:hidden cursor-pointer chevron-accordion-toggle`}
                    src={Chevron}
                    alt="Logo"
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel
                className={`bg-arc px-4 py-6 text-sm text-gray-500`}
              >
                <div>{children || "Accordion Content"}</div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default AccordionCrud;
