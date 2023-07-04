import { LoadingPage } from "~/components/Loading";
import MainPageLayout from "~/components/layouts/MainPageLayout";
import Image from "next/image";
import favicon from "/public/favicon.svg";
import LogoOffWhite from "~/assets/icons/LogoOffWhite.svg";
import { api } from "~/utils/api";
import Button from "~/components/Button";
const homePageImageUrl = "/HomePageImage.svg";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const Home = () => {
  const { data, isLoading } = api.example.foo.useQuery();

  if (isLoading) return <LoadingPage />;

  const isProduction = false;

  return (
    <MainPageLayout>
      {/* --------------------------------------------------------- */}
      {/* FONT */}
      <style jsx global>{`
        html {
          font-family: ${ubuntu.style.fontFamily};
        }
      `}</style>
      {/* FONT */}
      {/* --------------------------------------------------------- */}

      {/* --------------------------------------------------------- */}
      {/* MAIN CONTENT */}

      <div className="h-screen w-full lg:grid lg:grid-cols-2">
        {/* --------------------------------------------------------- */}
        {/* LEFT COLUMN */}
        <div
          className=" hidden bg-cover bg-center bg-no-repeat text-center lg:flex lg:flex-col lg:items-center lg:align-top"
          style={{
            backgroundImage: `url(${homePageImageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mt-12 flex flex-col items-center gap-3">
            <h1 className="text-[64px] text-arc ">Welcome to</h1>
            <Image src={LogoOffWhite} alt="logo" width={230} />
          </div>
        </div>

        {/* --------------------------------------------------------- */}
        {/* MAIN COLUMN */}
        <div className="align-center flex w-full flex-1 flex-col px-7 py-10 text-center lg:py-24">
          <h1 className="text-[32px] font-bold tracking-wide text-primary-dark lg:hidden">
            Welcome to
          </h1>
          <Image
            src={favicon}
            alt="logo"
            width={80}
            height={80}
            className=" self-center lg:hidden"
          />

          {/* --------------------------------------------------------- */}
          {/* isProduction true */}
          <div
            id="production"
            className={`mt-8 w-full rounded-[5px] bg-primary-base/30 px-[20px] py-8 lg:mt-[15%] lg:py-10 ${
              isProduction ? "" : "hidden"
            }`}
          >
            <h2 className="text-[24px] font-bold  tracking-wide text-black lg:text-[32px]">
              Your Productions
            </h2>
            <div
              id="production_items"
              className="mt-4 flex w-full flex-col gap-3 lg:mt-6 lg:gap-4"
            >
              <Button
                buttonType={"Secondary"}
                className="w-full max-w-full border lg:text-[16px]"
              >
                Production 1
              </Button>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* isProduction false  */}
          <div
            id="no_production"
            className={`mt-8 w-full lg:mt-[15%] ${
              isProduction ? "hidden" : ""
            }`}
          >
            <h2 className="text-[24px] font-bold tracking-wide text-black lg:text-[32px]">
              Your Productions
            </h2>
            <div
              id="no_production"
              className="my-8 w-full rounded-[5px] bg-primary-base/30 px-[20px] py-10"
            >
              <p className="lg:text-[16px]">
                You don&apos;t have a Production yet, but starting one is quick
                and simple. Click on the button below to get started!
              </p>
            </div>
          </div>
          {/* Create New Production */}
          <p className={`mt-4 lg:mt-6 ${isProduction ? "" : "hidden"}`}>Or</p>
          <Button
            buttonType={"Primary"}
            className="mt-4 self-center lg:mt-6 lg:text-[16px]"
          >
            New Production
          </Button>
        </div>
      </div>
    </MainPageLayout>
  );
};

export default Home;
