import Primary from "./Primary";
import Secondary from "./Secondary";
import Delete from "./Delete";

const Button = ({ buttonType, ...others }) => {
  switch (buttonType) {
    case "Primary":
      return <Primary {...others} />;
    case "Secondary":
      return <Secondary {...others} />;
    case "Delete":
      return <Delete {...others} />;
  }
};

export default Button;
