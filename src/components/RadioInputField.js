import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const RadioInputField = ({ enabled, onChange }) => {
  const [isEnabled, setIsEnabled] = useState(enabled); // Updated state variable name

  const handleToggle = () => {
    const newEnabled = !isEnabled; // Updated state variable name
    setIsEnabled(newEnabled);
    onChange(newEnabled);
  };

  return (
    <Switch
      checked={isEnabled} // Updated state variable name
      onChange={handleToggle}
      className={`${
        isEnabled ? "bg-primary-base" : "bg-contrast-light" // Updated state variable name
      } relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300`}
    >
      <span
        className={`${
          isEnabled ? "translate-x-[26px]" : "translate-x-[2px]" // Updated state variable name
        } inline-block h-5 w-5 rounded-full bg-white transition-transform duration-300 ease-in-out `}
      />
    </Switch>
  );
};

export default RadioInputField;
