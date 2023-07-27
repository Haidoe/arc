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
import BudgetStatusChart from "~/components/dashboard/BudgetStatusChart";
import DropDown from "~/components/global/DropDown";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";

dayjs.extend(LocalizedFormat);

const Dashboard = ({ productionInfo }) => {
  const today = dayjs().format("LL");

  return (
    <MainPageLayout>
      <Head>
        <title> {productionInfo.title} | Dashboard | Arc </title>
      </Head>

      <div className="flex flex-1 flex-col bg-backgroundArc lg:flex-row">
        <aside className="hidden flex-shrink-0 flex-col bg-arc sm:basis-[384px] lg:flex">
          <Sidebar data={productionInfo} theme="primary" />
        </aside>

        <aside className="flex bg-arc p-4 py-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] lg:hidden">
          <Sidebar data={productionInfo} isMobile />
        </aside>

        <div className="grid flex-1 grid-cols-2 content-start gap-6 px-4 py-4 lg:px-8">
          <div className="col-span-full mt-6">
            <div className="flex items-end justify-between">
              <h2 className="flex-grow text-2xl font-bold text-primary-dark">
                {today}
              </h2>

              <div>
                <DropDown
                  people={[{ name: "Today" }]}
                  selected={{ name: "Today" }}
                  isReadOnly={true}
                />
              </div>
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
            <BudgetStatusChart />
          </div>

          <div className="col-span-full">
            <SceneChart />
          </div>

          <div className="col-span-full">
            <UnfinishhedSceneSection />
          </div>

          <div className="col-span-full mt-8 flex justify-end">
            <Button className="min-w-[240px] text-xs"> Download Report </Button>
          </div>
        </div>
      </div>
    </MainPageLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const productionInfo = await getProductionInfoById(ctx.query.productionId);

    return {
      props: {
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

export default Dashboard;
