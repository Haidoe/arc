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
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span
        className={`${
          isEnabled ? "translate-x-6" : "translate-x-1" // Updated state variable name
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default RadioInputField;
