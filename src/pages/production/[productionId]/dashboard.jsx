import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";
import { getProductionInfoById } from "~/service/production";

const ProductionReportPage = ({ productionInfo }) => {
  return (
    <MainPageLayout>
      <div className="flex  flex-1 bg-backgroundArc">
        <aside className="flex  flex-shrink-0 flex-col bg-arc md:basis-[384px]">
          <Sidebar data={productionInfo} theme="primary" />
        </aside>

        <div className="grid flex-grow grid-cols-2 gap-4 px-4 py-8">
          <h2 className="text-3xl font-bold text-primary-dark">July 9, 2023</h2>
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

export default ProductionReportPage;
