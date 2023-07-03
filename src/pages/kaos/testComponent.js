import React from "react";
import TextInputField from "~/components/TextInputField";
import AddIcon from "~/assets/icons/Add.svg";

const testComponent = () => {
  const isError = true;

  return (
    <div className="m-4 flex w-72 flex-col gap-4">
      Text input field
      <div>
        <TextInputField inputType={`Border`} label="Label Me" />
      </div>
      <div>
        <TextInputField
          inputType={`BorderWithIcon`}
          label="Waiting for Icon"
          icon={AddIcon}
          isError={isError}
        />
      </div>
      <div>
        <TextInputField inputType={`Underline`} label="Label Me" />
      </div>
      <div>
        <TextInputField
          inputType={`Underline`}
          label="Label Me"
          isError={isError}
        />
      </div>
    </div>
  );
};

export default testComponent;
