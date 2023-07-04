import React from "react";
import TextInputField from "~/components/TextInputField";
import { AddIcon } from "~/assets/icons/AddIcon.svg";
import Button from "~/components/Button";

const testComponent = () => {
  const isError = true;

  return (
    <div className="w-100 m-4 flex flex-col gap-4">
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
      <div className=" flex flex-col gap-2 ">
        <Button buttonType={`Primary`} label="I am a button" className="w-12" />
        <Button buttonType={`Secondary`} label="I am a button" />
        <Button buttonType={`Delete`} label="I am a button" />
        <Button
          buttonType={`PrimaryWithIcon`}
          label="Waiting for Icon"
          icon={AddIcon}
        />
      </div>
    </div>
  );
};

export default testComponent;
