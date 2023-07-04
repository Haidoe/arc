import { type NextPage } from "next";
import { useEffect, useState } from "react";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Sidebar from "~/components/production/Information";
import { getProductionInfoById } from "~/service/production";
import type { ProductionWithProducer } from "~/types/types";

const Home: NextPage = () => {
  const [data, setData] = useState<ProductionWithProducer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProductionInfoById("648fe91b5a6933035f1b9ab2")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: unknown) => {
        setError(error as Error);
      });
  }, []);

  return (
    <MainPageLayout>
      <div className="flex flex-1">
        <aside className="flex  flex-col md:basis-[384px]">
          <Sidebar data={data} theme="primary" />
        </aside>

        <div className="flex-grow bg-tertiary-light">Hello world</div>
      </div>
    </MainPageLayout>
  );
};

export default Home;
