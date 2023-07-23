import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/Loading";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Button from "~/components/Button";
import favicon from "/public/favicon.svg";
import LogoOffWhite from "~/assets/icons/LogoOffWhite.svg";
import { loadDemoProductionInfo } from "~/helper/loadDemoProductionInfo";
import Link from "next/link";

const homePageImageUrl = "/images/home-page/home-page-image.svg";

const Home = () => {
  const [isProduction, setIsProduction] = useState(false);
  const [productionIds, setProductionIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    if (user && user.user && user.user.id && isLoading) {
      getProductionInfo();
    }
  }, [user, isLoading]);

  const getProductionInfo = async () => {
    try {
      const response = await fetch(
        `/api/user/productions?userId=${user.user.id}`
      );

      if (response.ok) {
        const data = await response.json();
        const productionInfo = data.productionInfo;
        // console.log("productionInfo:", productionInfo);
        // console.log(productionInfo.length);
        if (productionInfo.length > 0) {
          setIsProduction(true);
          setProductionIds(productionInfo);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingPage />;

  //TODO: handle click on production button
  //redirect to production page with productionId
  const handleClick = (productionID) => {
    alert(productionID);
    // /production/[productionId]/report
  };

  //NOTE: this function is used to load the demo production info to the database
  const handleDemoClick = async () => {
    setIsProjectLoading(true);
    await loadDemoProductionInfo();
    getProductionInfo();
    setIsProjectLoading(false);
  };

  return (
    <MainPageLayout>
      {/* --------------------------------------------------------- */}
      {/* MAIN CONTENT */}

      <div className="flex flex-1 lg:grid lg:grid-cols-2">
        {/* --------------------------------------------------------- */}
        {/* LEFT COLUMN */}
        <div
          className="hidden bg-cover bg-center bg-no-repeat text-center lg:flex lg:flex-col lg:items-center lg:align-top"
          style={{
            backgroundImage: `url(${homePageImageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-12 flex flex-col items-center gap-3">
            <h1 className="text-[64px] text-arc ">Welcome to</h1>
            {/* //if screen is wider than 1024px, logo width is 220px */}
            <Image src={LogoOffWhite} alt="logo" width={220} />
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* MAIN COLUMN */}
        <div className="align-center flex w-full flex-1 flex-col px-7 py-10 text-center lg:py-24">
          <div className="flex flex-col gap-2 self-center">
            <h1 className="text-[32px] font-bold tracking-wide text-primary-dark lg:hidden">
              Welcome to
            </h1>
            <Image
              src={favicon}
              alt="logo"
              width={screen.width > 1024 ? 80 : 60}
              // width={80}
              // height={80}
              className=" self-center lg:hidden"
            />
          </div>

          {/* --------------------------------------------------------- */}
          {/* isProduction true */}
          <div
            id="production"
            className={`mt-8 flex w-full flex-col items-center rounded-[5px] px-[20px] py-8 lg:py-10 ${
              isProduction ? "" : "hidden"
            }`}
          >
            <h2 className="text-[24px] font-bold  tracking-wide text-contrast-dark lg:text-[32px]">
              Your Productions
            </h2>
            <div
              id="production_items"
              className="mt-6 flex w-full flex-col gap-3 lg:mt-6 lg:gap-4"
            >
              {/* //map through productionIds and create a button for each one  */}
              {productionIds.map((production) => (
                <Link
                  key={production.id}
                  href={`/production/${production.id}/report`}
                  className="button w-full max-w-[400px] self-center border-[1.5px] border-primary-light bg-white text-sm font-bold text-primary-light hover:shadow-lg active:bg-primary-light active:text-white lg:py-4"
                >
                  {production.title}{" "}
                </Link>
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* isProduction false  */}
          <div
            id="no_production"
            className={`mt-6 w-full lg:mt-[15%] ${
              isProduction ? "hidden" : ""
            }`}
          >
            <h2 className="text-[24px] font-bold tracking-wide text-contrast-dark lg:text-[32px]">
              Your Productions
            </h2>
            <div
              id="no_production"
              className="my-8 w-full rounded-[5px] px-[20px] py-10"
            >
              <p className="lg:text-[16px]">
                You don&apos;t have a Production yet, but starting one is quick
                and simple. Click on the button below to get started!
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------- */}

          {/* Create New Production */}
          <p className={`mt-4 lg:mt-6 ${isProduction ? "" : "hidden"}`}>Or</p>

          <Button
            buttonType={"Primary"}
            className="mt-4 self-center px-12 lg:mt-6"
            onClick={handleDemoClick}
            disabled={isProjectLoading}
          >
            {isProjectLoading ? "Loading..." : "Create Sample Production"}
          </Button>
          <Button
            buttonType={"Disabled"}
            className="mt-4 self-center px-12 lg:mt-6"
            onClick={handleDemoClick}
            disabled={isProjectLoading}
          >
            Create New Production
          </Button>
        </div>
      </div>
    </MainPageLayout>
  );
};

export default Home;
