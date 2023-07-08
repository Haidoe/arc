import React from "react";
import TextInputField from "~/components/TextInputField";
import { AddIcon } from "~/assets/icons/AddIcon.svg";
import Button from "~/components/Button";
import TextArea from "~/components/TextArea";
import TimeInputField from "~/components/TimeInputField";
import RadioInputField from "~/components/RadioInputField";
import AccordionModal from "~/components/report/AccordionModal";
import ScheduleOfTheDayForm from "~/components/report/ScheduleOfTheDayForm";
import ActualScheduleForm from "~/components/report/ActualScheduleForm";
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
      <div className="flex flex-col gap-4 bg-slate-400 p-4">
        <AccordionModal title={"Schedule for the day"} defaultOpen={true}>
          <ScheduleOfTheDayForm />
        </AccordionModal>
        <AccordionModal title={"Actual Schedule"} defaultOpen={true}>
          <ActualScheduleForm />
        </AccordionModal>
      </div>
      <div>
        <TextInputField inputType={`Border`} label="Label Me" />
      </div>
      <div>
        <TextInputField inputType={`Border`} />
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
      <div>Borderless</div>
      <TextInputField />
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
    </div>
  );
};

export default testComponent;
