import Border from "./Border";
import Underline from "./Underline";

const TextInputField = ({ inputType, ...others }) => {
  switch (inputType) {
    case "Border":
      return <Border {...others} />;
    case "Underline":
      return <Underline {...others} />;
  }
};

export default TextInputField;
