import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Borderless = forwardRef(
  ({ name, value, onChange, className, defaultValue, placeholder }, ref) => {
    return (
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        placeholder={placeholder}
        className={`text-input-borderless-input peer text-sm text-contrast-dark ${className}`}
        ref={ref}
        defaultValue={defaultValue}
      />
    );
  }
);

export default Borderless;
