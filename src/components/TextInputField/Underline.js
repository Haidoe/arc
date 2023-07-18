import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Underline = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      isError,
      className,
      defaultValue,
      placeholder,
      tabIndex,
    },
    ref
  ) => {
    return (
      <div className="relative h-12 w-full min-w-[160px]">
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          tabIndex={tabIndex}
          placeholder={placeholder}
          className={`text-input-underline-input peer text-sm text-contrast-dark ${
            isError ? "underline-input-error" : ""
          } ${className}`}
          ref={ref}
          defaultValue={defaultValue}
        />
        <label
          className={`before:content[' '] after:content[' '] text-input-underline-label ${
            isError ? "underline-label-error" : ""
          }`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Underline;
