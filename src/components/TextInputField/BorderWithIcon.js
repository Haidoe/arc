import { ReactSVG } from "react-svg";
import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const BorderWithIcon = forwardRef(
  (
    { label, name, value, onChange, icon, isError, className, defaultValue },
    ref
  ) => {
    return (
      <div className="relative h-12 w-full min-w-[160px]">
        <button class="absolute right-3 top-2/4 grid h-6 w-6 -translate-y-2/4 place-items-center">
          <ReactSVG src={icon} />
        </button>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          placeholder=" "
          className={`text-input-border-input peer text-sm text-contrast-dark ${
            isError ? "input-error" : ""
          } ${className}`}
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

export default BorderWithIcon;
