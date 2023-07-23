// react and redux
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setProductionReport } from "~/redux/features/ProductionReportSlice";

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
import { LoadingPage } from "~/components/Loading";
import getReportById from "~/service/report";

const PublicReportPage = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [productionInfo, setProductionInfo] = useState(null);

  const router = useRouter();
  const { reportId } = router.query;

  // const params = router.query;

  useEffect(() => {
    if (!reportId) return;

    const fetchReport = async () => {
      const response = await getReportById(reportId);

      //check if null and redirect
      if (!response || !response.data) {
        router.push("/");
        return;
      }

      dispatch(setProductionReport(response.data));
      setProductionInfo(response.data.Production);
      setIsLoading(false);
    };

    fetchReport();
  }, [reportId]);

  const pageContainerClasses = isExpanded
    ? ""
    : "lg:ml-[-334px] lg:w-[calc(100vw+334px)]";

  if (isLoading) return <LoadingPage />;

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
        </div>
      </div>
    </MainPageLayout>
  );
};

export default PublicReportPage;
