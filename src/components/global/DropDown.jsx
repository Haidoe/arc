import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import Chevron from "~/assets/icons/ChevronGray.svg";

export default function DropDown({ people, selected, setSelected, width, isReadOnly, bgColor = "bg-arc", inputClassName }) {

  
  let widthClass = "";
  if (width == "small") {
    widthClass = "w-[5.5rem]";
  } else if (width == "medium") {
    widthClass = "w-[8rem]";
  }

  return (
    <div className={widthClass}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className={` ${isReadOnly ? "pointer-events-none": ""} relative w-full cursor-default rounded-lg ${bgColor} py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-s`}>
            <span className={`block truncate ${inputClassName}`}>{selected?.name ?? ""}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <Image
                className={`${"rotate-180 transform"} h-6 w-6 text-arc`}
                aria-hidden="true"
                src={Chevron}
                alt="chevron down"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-arc py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-primary-trans text-contrast-dark" : "text-contrast-dark"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {false ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Image
                            className={`${"rotate-90 transform"} h-6 w-6 text-arc`}
                            aria-hidden="true"
                            src={Chevron}
                            alt="Logo"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
