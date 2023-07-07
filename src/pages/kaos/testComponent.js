import React from "react";
import TextInputField from "~/components/TextInputField";
import { AddIcon } from "~/assets/icons/AddIcon.svg";
import Button from "~/components/Button";
import TextArea from "~/components/TextArea";
import TimeInputField from "~/components/TimeInputField";
import RadioInputField from "~/components/RadioInputField";
import Accordion from "~/components/report/Accordion";
import { useState } from "react";

const testComponent = () => {
  const isError = true;

  const handleClick = () => {
    console.log("clicked");
  };

  //Toggle**************************************
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggleChange = (newEnabled) => {
    setIsEnabled(newEnabled);
    console.log("Toggle:", newEnabled);
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
      <div className="flex flex-col gap-2 ">
        <Button buttonType={`Primary`} onClick={handleClick}>
          Edit
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
      <div>
        {/* //use resize-none / resize-x /resize-y to disable resize */}
        <TextArea name="myTextarea" placeholder="Hey" className="h-48 w-96" />
      </div>
      <div>
        <TimeInputField name="myTimeInput" />
      </div>
      <div>
        <RadioInputField enabled={isEnabled} onChange={handleToggleChange} />
      </div>
      <div>
        <Accordion title={"Schedule for the day"} defaultOpen={true}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <TextInputField
                label="Email"
                inputType="Border"
                className="flex-1"
              />
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default testComponent;
