/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

const TimeInputField = forwardRef(
  (
    { name, value, onChange, className, isReadyOnly, defaultValue, tabIndex, required = false, containerClass },
    ref
  ) => {
    return (
      <div className={containerClass}>
        <input
          type="time"
          name={name}
          value={value}
          onChange={onChange}
          tabIndex={tabIndex}
          className={`rounded-[4px] border-[1px] border-contrast-light bg-arc px-2 text-base text-hyperlink before:text-inherit ${className} time-input h-10 w-full text-center focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-hyperlink`}
          readOnly={isReadyOnly}
          defaultValue={defaultValue}
          ref={ref}
          required={required}
        />
      </div>
    );
  }
);

export default TimeInputField;
