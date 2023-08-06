// react and redux
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
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
import { LoadingPage } from "~/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import DownloadReportButton from "~/components/DownloadReportButton";
import Image from "next/image";

// store and get expanded value from local storage

function getExpandedValue() {
  if (typeof window === "undefined") return true;
  if (localStorage.getItem("isExpanded") == null) {
    return true;
  } else {
    return JSON.parse(localStorage.getItem("isExpanded"));
  }
}

function setExpandedValue(value) {
  localStorage.setItem("isExpanded", JSON.stringify(value));
}

const ProductionReportPage = ({ productionId }) => {
  const { push } = useRouter();

  const fetchReportRef = useRef(true);

  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(getExpandedValue());

  const production = useQuery({
    queryKey: ["production", productionId],
    queryFn: () => getProductionInfoById(productionId),
  });

  //Most probably this will never happen unless they change the url manually
  if (production.isError) {
    //Redirect to 404
    push("/404");
  }

  useEffect(() => {
    const fetchTodaysReport = async () => {
      try {
        const { todayReportId } = await getTodayReportId(productionId);

        let result = null;

        if (!todayReportId) {
          const response = await createDailyProductionReport(productionId);
          console.log(response);
          result = response.report;
        } else {
          result = await getProductionReportById(productionId, todayReportId);
        }

        dispatch(setProductionReport(result));
      } catch (error) {
        console.log("FAILED TO LOAD TODAY'S REPORT", error);
      } finally {
        setIsPageLoading(false);
      }
    };

    if (fetchReportRef.current) {
      fetchReportRef.current = false;
      fetchTodaysReport();
    }
  }, []);

  const pageContainerClasses = isExpanded
    ? ""
    : "lg:ml-[-334px] lg:w-[calc(100vw+334px)]";

  if (isPageLoading || production.isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>{production.data.title} | ARC </title>
      </Head>

      <div
        className={` flex flex-1 flex-col bg-backgroundArc transition-all lg:flex-row ${pageContainerClasses}`}
      >
        {/* Desktop Version */}
        <aside className="relative hidden flex-shrink-0 flex-col bg-arc md:basis-[384px] lg:flex">
          <Sidebar
            data={production.data}
            isContentVisible={!isExpanded}
            theme="primary"
          />

          <button
            className="absolute right-[-1rem] top-[16px] flex h-[88px] w-[35px] items-center justify-center rounded-[5px] bg-primary-dark text-white"
            onClick={() => {
              setExpandedValue(!isExpanded);
              setIsExpanded(!isExpanded);
            }}
          >
            <Image
              src="/images/icons/chevron-right.svg"
              alt="chevron icon"
              width={12}
              height={24}
              className={`transform ${isExpanded ? "rotate-180" : ""}`}
            />
            <span className="sr-only">
              {isExpanded
                ? `Minimize Production Info Sidebar`
                : `Expand Production Info Sidebar`}
            </span>
          </button>
        </aside>

        {/* This is for mobile */}
        <aside className="flex bg-arc p-4 py-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] lg:hidden">
          <Sidebar data={production.data} isMobile={true} />
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
            <RollsForm productionId={productionId} />
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Cast Time Log Schedule"} defaultOpen={true}>
              <CastTimeLogForm productionInfo={production.data} />
            </AccordionCrud>
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Scenes Shot Form"} defaultOpen={true}>
              <ScenesShotForm productionInfo={production.data} />
            </AccordionCrud>
          </div>

          <div className="col-span-full">
            <AccordionCrud title={"Extras Cast Form"} defaultOpen={true}>
              <ExtrasCastForm />
            </AccordionCrud>
          </div>

          <div className="col-span-full flex flex-col items-center gap-4 lg:flex-row lg:justify-end">
            <DownloadReportButton />
            <ShareReportButton productionInfo={production.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      productionId: ctx.query.productionId,
    },
  };
};

export default ProductionReportPage;
