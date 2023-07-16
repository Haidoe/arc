import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Border = forwardRef(
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
    },
    ref
  ) => {
    return (
      <div className={`relative h-12 w-full min-w-[160px] ${className ?? ""}`}>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          placeholder={placeholder}
          className={`text-input-border-input peer text-sm text-contrast-dark ${
            isError ? "input-error" : ""
          }`}
          ref={ref}
          defaultValue={defaultValue}
        />
        <label
          className={`before:content[' '] after:content[' '] text-input-border-label ${
            isError ? "label-error" : ""
          }`}
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default Border;
