// react and redux
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProductionReport } from "~/redux/features/ProductionReportSlice";

// services
import createDailyProductionReport from "~/service/production/createDailyProductionReport";
import getTodayReportId from "~/service/production/getTodayReportId";
import {
  getProductionInfoById,
  getProductionReportById,
} from "~/service/production";

// components
import Head from "next/head";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";
import ScheduleOfTheDayForm from "~/components/report/ScheduleOfTheDayForm";
import ActualScheduleForm from "~/components/report/ActualScheduleForm";
import AccordionCrud from "~/components/report/AccordionCrud";
import Accordion from "~/components/report/Accordion";
import RollsForm from "~/components/report/RollsForm";
import CastTimeLogForm from "~/components/report/CastTimeLogForm";
import ScenesShotForm from "~/components/report/ScenesShotForm.jsx";
import NotShotForm from "~/components/report/NotShotForm.jsx";
import ExtrasCastForm from "~/components/report/ExtrasCastForm.jsx";
import ShareReportButton from "~/components/report/ShareReport";

const ProductionReportPage = ({ productionInfo, report }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    //Puting the report data in redux store
    dispatch(setProductionReport(report));
    // console.log(report);
  }, []);

  const pageContainerClasses = isExpanded
    ? ""
    : "lg:ml-[-334px] lg:w-[calc(100vw+334px)]";

  return (
    <MainPageLayout>
      <Head>
        <title>{productionInfo.title} | Arc </title>
      </Head>

      <div
        className={` flex flex-1 flex-col bg-backgroundArc transition-all lg:flex-row ${pageContainerClasses}`}
      >
        {/* Desktop Version */}
        <aside className="relative hidden flex-shrink-0 flex-col bg-arc md:basis-[384px] lg:flex">
          <Sidebar data={productionInfo} isContentVisible={!isExpanded} />

          <button
            className="absolute right-[-.75rem] top-[8px] h-[28px] w-[28px] rounded-full bg-arc text-primary-dark shadow-3xl"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? `<` : `>`}
            <span className="sr-only">
              {isExpanded
                ? `Minimize Production Info Sidebar`
                : `Expand Production Info Sidebar`}
            </span>
          </button>
        </aside>

        {/* This is for mobile */}
        <aside className="flex bg-arc p-4 py-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] lg:hidden">
          <Sidebar data={productionInfo} isMobile={true} />
        </aside>

        <div className="grid flex-1 grid-cols-2 content-start gap-4 p-4 lg:p-8">
          <div className="col-span-full bg-arc md:col-span-1">
            <ScheduleOfTheDayForm />
          </div>

          <div className="col-span-full bg-arc md:col-span-1">
            <ActualScheduleForm />
          </div>

          <div className="col-span-full bg-arc md:col-span-1 ">
            <Accordion title={"Not Shot Form"} defaultOpen={true}>
              <NotShotForm />
            </Accordion>
          </div>

          <div className="col-span-full bg-arc md:col-span-1 ">
            <RollsForm />
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Cast Time Log Schedule"} defaultOpen={true}>
              <CastTimeLogForm productionInfo={productionInfo} />
            </AccordionCrud>
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Scenes Shot Form"} defaultOpen={true}>
              <ScenesShotForm productionInfo={productionInfo} />
            </AccordionCrud>
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Extras Cast Form"} defaultOpen={true}>
              <ExtrasCastForm />
            </AccordionCrud>
          </div>

          <div className="col-span-full">
            <ShareReportButton prodData={productionInfo} />
          </div>
        </div>
      </div>
    </MainPageLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const productionInfo = await getProductionInfoById(ctx.query.productionId);

    const { todayReportId } = await getTodayReportId(ctx.query.productionId);

    let result = null;

    if (!todayReportId) {
      const response = await createDailyProductionReport(
        ctx.query.productionId
      );

      result = response.report;
    } else {
      result = await getProductionReportById(
        ctx.query.productionId,
        todayReportId
      );
    }

    return {
      props: {
        report: result,
        productionInfo,
      },
    };
  } catch (error) {
    //Redirect if the productionId is not valid
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
};

export default ProductionReportPage;
