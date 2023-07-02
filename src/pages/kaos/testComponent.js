import React from "react";
import TextInputField from "~/components/TextInputField";

const testComponent = () => {
  return (
    <div className="m-4 flex w-72 flex-col gap-4">
      Text input field
      <div>
        <TextInputField inputType={`Border`} label="Javie" />
      </div>
      <div>
        <TextInputField inputType={`Underline`} label="Javie" />
      </div>
    </div>
  );
};

export default testComponent;
