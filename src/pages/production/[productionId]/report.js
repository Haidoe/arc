import { useEffect, useState } from "react";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";
import { getProductionInfoById } from "~/service/production";
import ScheduleOfTheDayForm from "~/components/report/ScheduleOfTheDayForm";
import AccordionModal from "~/components/report/AccordionModal";

const ProductionReportPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductionInfoById("648fe91b5a6933035f1b9ab2")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <MainPageLayout>
      <div className="flex flex-1  bg-backgroundArc pt-8">
        <aside className="flex  flex-col bg-arc md:basis-[384px]">
          <Sidebar data={data} />
        </aside>

        <div className="grid flex-grow grid-cols-2 gap-4 px-4">
          <AccordionModal title="Schedule Of The Day" defaultOpen={true}>
            <ScheduleOfTheDayForm />
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

export default ProductionReportPage;
