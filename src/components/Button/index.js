import Primary from "./Primary";
import Secondary from "./Secondary";
import Delete from "./Delete";
import PrimaryWithIcon from "./PrimaryWithIcon";
import Disabled from "./Disabled";

const Button = ({ buttonType, ...others }) => {
  switch (buttonType) {
    case "Primary":
      return <Primary {...others} />;
    case "Secondary":
      return <Secondary {...others} />;
    case "Delete":
      return <Delete {...others} />;
    case "PrimaryWithIcon":
      return <PrimaryWithIcon {...others} />;
    case "Disabled":
      return <Disabled {...others} />;
    default:
      return <Primary {...others} />;
  }
};

export default Button;
