import React from "react";
import TextInputField from "~/components/TextInputField";
import { AddIcon } from "~/assets/icons/AddIcon.svg";
import Button from "~/components/Button";

const testComponent = () => {
  const isError = true;

  const handleClick = () => {
    console.log("clicked");
  };

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
        <Button buttonType={`Primary`} onClick={handleClick} className="w-12">
          Edit{" "}
        </Button>
        <Button buttonType={`Secondary`} onClick={handleClick}>
          Edit
        </Button>
        <Button buttonType={`Delete`} onClick={handleClick}>
          Edit
        </Button>
        <Button
          buttonType={`PrimaryWithIcon`}
          label="Waiting for Icon"
          icon={AddIcon}
          onClick={handleClick}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default testComponent;
