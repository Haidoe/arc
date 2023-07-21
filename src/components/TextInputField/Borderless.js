import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Borderless = forwardRef(
  (
    { name, value, onChange, className, defaultValue, placeholder, tabIndex, required = false },
    ref
  ) => {
    return (
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        placeholder={placeholder}
        tabIndex={tabIndex}
        className={`text-input-borderless-input peer text-sm text-contrast-dark ${className}`}
        ref={ref}
        defaultValue={defaultValue}
        required={required}
      />
    );
  }
);

export default Borderless;
