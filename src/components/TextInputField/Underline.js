import { type } from "os";
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
      readOnly = false,
      type,
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
          type={type ?? "text"}
          tabIndex={tabIndex}
          placeholder={placeholder}
          className={`text-input-underline-input peer text-contrast-dark ${
            isError ? "underline-input-error" : ""
          } ${className}`}
          ref={ref}
          defaultValue={defaultValue}
          readOnly={readOnly}
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
