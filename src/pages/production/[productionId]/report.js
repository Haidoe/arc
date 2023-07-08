import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";
import createDailyProductionReport from "~/service/production/createDailyProductionReport";
import getTodayReportId from "~/service/production/getTodayReportId";
import {
  getProductionInfoById,
  getProductionReportById,
} from "~/service/production";

import ScheduleOfTheDayForm from "~/components/report/ScheduleOfTheDayForm";
import ActualScheduleForm from "~/components/report/ActualScheduleForm";
import AccordionModal from "~/components/report/AccordionModal";

const ProductionReportPage = ({ productionInfo, report }) => {
  console.log("PROOOOOPS", productionInfo, report);

  return (
    <MainPageLayout>
      <div className="flex flex-1  bg-backgroundArc pt-8">
        <aside className="flex  flex-col bg-arc md:basis-[384px]">
          <Sidebar data={productionInfo} />
        </aside>

        <div className="grid flex-grow grid-cols-2 gap-4 px-4">
          <AccordionModal title="Schedule Of The Day" defaultOpen={true}>
            <ScheduleOfTheDayForm />
          </AccordionModal>
          <AccordionModal title="Actual Schedule" defaultOpen={true}>
            <ActualScheduleForm />
          </AccordionModal>
          <div className="bg-primary-light"> Form here </div>
          <div className="bg-primary-light"> Form here </div>
          <div className="bg-primary-light"> Form here </div>
          <div className="bg-primary-light"> Form here </div>
        </div>
      </div>
    </MainPageLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { todayReportId } = await getTodayReportId(ctx.query.productionId);

  let result = null;

  if (!todayReportId) {
    const response = await createDailyProductionReport(ctx.query.productionId);

    result = response.report;
  } else {
    result = await getProductionReportById(
      ctx.query.productionId,
      todayReportId
    );
  }

  const productionInfo = await getProductionInfoById(ctx.query.productionId);

  return {
    props: {
      report: result,
      productionInfo,
    },
  };
};

export default ProductionReportPage;
