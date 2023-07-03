import Border from "./Border";
import Underline from "./Underline";
import BorderWithIcon from "./BorderWithIcon";

const TextInputField = ({ inputType, ...others }) => {
  switch (inputType) {
    case "Border":
      return <Border {...others} />;
    case "Underline":
      return <Underline {...others} />;
    case "BorderWithIcon":
      return <BorderWithIcon {...others} />;
  }
};

export default TextInputField;
