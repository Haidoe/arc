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
import { useDispatch } from "react-redux";
import { setProductionReport } from "~/redux/features/ProductionReportSlice";
import { useEffect } from "react";

const ProductionReportPage = ({ productionInfo, report }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Puting the report data in redux store
    dispatch(setProductionReport(report));
  }, []);

  return (
    <MainPageLayout>
      <div className="flex  flex-1 bg-backgroundArc pt-8">
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
