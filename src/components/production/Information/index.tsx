import ListItem from "./ListItem";
import DefaultAvatar from "~/components/global/DefaultAvatar";
import type { ProductionWithProducer } from "~/types/types";
import ListItemWithDatetime from "./ListItemWithDatetime";
import Button from "~/components/Button";

type ProductionInformationProps = {
  data: ProductionWithProducer | null;
  theme?: "primary" | null;
};

const ProductionInformation = (props: ProductionInformationProps) => {
  if (!props.data) return <aside>Production Info Data Not Found...</aside>;

  const { data } = props;

  const borderColor =
    props.theme === "primary" ? "border-arc" : "border-primary-light";

  const wrapperClass = props.theme && "text-arc bg-primary-light";

  return (
    <div className={`flex-grow  px-[24px] pb-12 ${wrapperClass ?? ""}`}>
      <ul className="pb-4">
        <li className={`flex gap-4 border-b-[1.5px]  py-[20px] ${borderColor}`}>
          <div className="basis-[94px]">
            <DefaultAvatar theme="primary" />
          </div>

          <p className="flex flex-1 items-center text-lg font-bold">
            {data.title}
          </p>
        </li>

        <ListItem theme={props.theme} title="Description">
          {data.description}
        </ListItem>

        <ListItem theme={props.theme} title="Director">
          {data.director}
        </ListItem>

        <ListItem theme={props.theme} title="Producer">
          {data.producer.name}
        </ListItem>

        <ListItem theme={props.theme} title="1st Assistant">
          {data.firstAssistantDirector}
        </ListItem>

        <ListItem theme={props.theme} title="2nd Assistant">
          {data.secondAssistantDirector}
        </ListItem>

        <ListItem theme={props.theme} title="Production Coordinator">
          {data.productionCoordinator}
        </ListItem>

        <ListItemWithDatetime
          title="Date Started"
          datetime={data.duration?.startDate ?? null}
          theme={props.theme}
        />

        <ListItemWithDatetime
          title="Estimated Finish"
          datetime={data.duration?.estimatedFinishDate ?? null}
          theme={props.theme}
          isLast
        />
      </ul>

      <div className="item-center flex justify-center">
        <Button
          buttonType={props.theme === "primary" ? "Primary" : "Secondary"}
          className={`px-4 py-2 text-base ${
            props.theme === "primary" ? "shadow-3xl" : ""
          }`}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProductionInformation;
