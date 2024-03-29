import { useState, type ReactNode } from "react";
import ListItem from "./ListItem";
import DefaultAvatar from "~/components/global/DefaultAvatar";
import InformationModal from "~/components/global/InformationModal";
import type { ProductionWithProducer } from "~/types/types";
import ListItemWithDatetime from "./ListItemWithDatetime";
import Button from "~/components/Button";
import { getMovieImage } from "~/helper/loadDemoProductionInfo";

type ProductionInformationProps = {
  data: ProductionWithProducer | null;
  theme?: "primary" | null;
  isContentVisible?: boolean;
  children?: ReactNode;
  isMobile?: boolean;
};

const ProductionInformation = (props: ProductionInformationProps) => {
  const [infoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isMobile] = useState(props.isMobile ?? false);
  const [isCollapsed, setIsCollapsed] = useState(props.isMobile ? false : true);

  if (!props.data) return <aside>Production Info Data Not Found...</aside>;

  const { data } = props;

  const borderColor =
    props.theme === "primary" ? "border-[#8585DB]" : "border-primary-base";

  const wrapperClass =
    props.theme === "primary"
      ? "text-arc bg-primary-dark"
      : "text-contrast-dark bg-arc";

  return (
    <>
      {infoModalOpen && (
        <InformationModal
          heading={"Future Feature"}
          message={"This feature will be live in the coming future"}
          closeModalHandler={() => setIsInfoModalOpen(false)}
        />
      )}

      <div className={`flex-grow lg:px-[24px] lg:pb-12 ${wrapperClass ?? ""}`}>
        <ul className={`pb-4 ${props.isContentVisible ? "invisible" : ""}`}>
          <li
            className={`flex gap-4 border-b-[1.5px]  py-[20px] ${borderColor}`}
          >
            <div className="basis-[94px]">
              <DefaultAvatar
                theme="primary"
                imgURL={getMovieImage(props.data.title)}
              />
            </div>

            <div className="flex flex-1 flex-col  justify-center">
              <h2
                className={`text-lg font-bold ${isMobile ? "text-right" : ""}`}
              >
                {data.title}
              </h2>

              {isMobile && !isCollapsed && (
                <div className="flex flex-1 items-end justify-end">
                  <Button
                    buttonType="Secondary"
                    className="min-w-[104px] py-2 text-base font-bold"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    See more
                  </Button>
                </div>
              )}
            </div>
          </li>

          {isCollapsed && (
            <>
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
            </>
          )}
        </ul>

        <div
          className={`item-center flex ${
            isMobile ? "justify-end gap-4" : "justify-center"
          }`}
        >
          {isCollapsed && (
            <Button
              buttonType={props.theme === "primary" ? "Primary" : "Secondary"}
              onClick={() => setIsInfoModalOpen(true)}
              className={`mx-2 text-base ${
                isMobile ? "border-[1.5px] font-bold" : ""
              } ${props.theme === "primary" ? "shadow-3xl" : ""}`}
            >
              Edit
            </Button>
          )}

          {isMobile && isCollapsed && (
            <Button
              buttonType={"Secondary"}
              className="min-w-[104px] border-[1.5px] text-base font-bold"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              See less
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductionInformation;
