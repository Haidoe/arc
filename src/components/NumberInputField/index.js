import Border from "./Border";
import Underline from "./Underline";
import BorderWithIcon from "./BorderWithIcon";
import Borderless from "./Borderless";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const NumberInputField = forwardRef(({ inputType, ...others }, ref) => {
  switch (inputType) {
    case "Border":
      return <Border {...others} ref={ref} />;
    case "Underline":
      return <Underline {...others} ref={ref} />;
    case "BorderWithIcon":
      return <BorderWithIcon {...others} ref={ref} />;
    default:
      return <Borderless {...others} ref={ref} />;
  }
});

export default NumberInputField;
