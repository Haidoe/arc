import ListItem from "./ListItem";
import DefaultAvatar from "~/components/global/DefaultAvatar";
import type { ProductionWithProducer } from "~/types/types";
import ListItemWithDatetime from "./ListItemWithDatetime";

type ProductionInformationProps = {
  data: ProductionWithProducer | null;
};

const ProductionInformation = (props: ProductionInformationProps) => {
  if (!props.data) return <aside>Production Info Data Not Found...</aside>;

  const { data } = props;

  return (
    <div className="px-[24px]">
      <ul className="pb-4">
        <li className="flex gap-4 border-b-[1.5px] border-primary-light py-[20px]">
          <div className="basis-[94px]">
            <DefaultAvatar />
          </div>

          <p className="flex flex-1 items-center text-lg font-bold">
            {data.title}
          </p>
        </li>

        <ListItem title="Description" content={data.description} />

        <ListItem title="Director" content={data.director} />

        <ListItem title="Producer" content={data.producer.name} />

        <ListItem title="1st Assistant" content={data.firstAssistantDirector} />

        <ListItem
          title="2nd Assistant"
          content={data.secondAssistantDirector}
        />

        <ListItem
          title="Production Coordinator"
          content={data.productionCoordinator}
        />

        <ListItemWithDatetime
          title="Date Started"
          datetime={data.duration?.startDate ?? null}
        />

        <ListItemWithDatetime
          title="Estimated Finish"
          datetime={data.duration?.estimatedFinishDate ?? null}
          isLast
        />
      </ul>
    </div>
  );
};

export default ProductionInformation;
