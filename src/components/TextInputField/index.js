import Border from "./Border";
import Underline from "./Underline";
import BorderWithIcon from "./BorderWithIcon";
import Borderless from "./Borderless";

const TextInputField = ({ inputType, ...others }) => {
  switch (inputType) {
    case "Border":
      return <Border {...others} />;
    case "Underline":
      return <Underline {...others} />;
    case "BorderWithIcon":
      return <BorderWithIcon {...others} />;
    default:
      return <Borderless {...others} />;
  }
};

export default TextInputField;
