import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { getProductionInfoById } from "~/service/production";

// components
import ActiveActors from "~/components/dashboard/ActiveActors";
import ActiveExtras from "~/components/dashboard/ActiveExtras";
import Head from "next/head";
import UnfinishhedSceneSection from "~/components/dashboard/UnfinishedSceneSection";
import Button from "~/components/Button";
import SceneChart from "~/components/dashboard/SceneChart";
import ProgressChart from "~/components/dashboard/ProgressChart";
import Sidebar from "~/components/production/Information";
import Accordion from "~/components/report/Accordion";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/Loading";
import { useQuery } from "@tanstack/react-query";

dayjs.extend(LocalizedFormat);

const Dashboard = () => {
  const { query } = useRouter();
  const { productionId } = query;

  const production = useQuery({
    queryKey: ["production", productionId],
    enabled: !!productionId,
    queryFn: () => getProductionInfoById(productionId),
  });

  const today = dayjs().format("LL");

  if (production.isLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title> {production.data.title} | Dashboard | Arc </title>
      </Head>

      <div className="flex flex-1 flex-col bg-backgroundArc lg:flex-row">
        <aside className="hidden flex-shrink-0 flex-col bg-arc sm:basis-[384px] lg:flex">
          <Sidebar data={production.data} theme="primary" />
        </aside>

        <aside className="flex bg-arc p-4 py-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] lg:hidden">
          <Sidebar data={production.data} isMobile />
        </aside>

        <div className="grid flex-1 grid-cols-2 content-start gap-6 p-4 lg:p-8">
          <div className="col-span-full">
            <div className="flex items-end justify-between">
              <h2 className="flex-grow text-2xl font-bold text-primary-dark">
                {today}
              </h2>
            </div>

            <hr className="my-2 border-b border-contrast-light" />
          </div>

          <div className="col-span-full sm:col-span-1">
            <ActiveActors />
          </div>

          <div className="col-span-full sm:col-span-1">
            <ActiveExtras />
          </div>

          <div className="col-span-full mt-6">
            <h2 className="text-2xl font-bold text-primary-dark">
              General Reports
            </h2>
            <hr className="my-2 border-b border-contrast-light" />
          </div>

          <div className="col-span-full">
            <Accordion title={"Production Progress Chart"} defaultOpen={true}>
              <ProgressChart />
            </Accordion>
          </div>

          <div className="col-span-full">
            <Accordion title={"Scenes Shot Chart"} defaultOpen={true}>
              <SceneChart />
            </Accordion>
          </div>

          <div className="col-span-full">
            <Accordion title={"Unfinished Scenes"} defaultOpen={true}>
              <UnfinishhedSceneSection />
            </Accordion>
          </div>

          <div className="col-span-full flex justify-end">
            <Button className="min-w-[240px] text-xs">Download Report</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
