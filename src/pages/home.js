import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/Loading";
const homePageImageUrl = "/images/landing-page/aboutDesktopFull.png";
import triangleMask from "~/../public/images/landing-page/triangleMask.png";
import Button from "~/components/Button";
import favicon from "/public/favicon.svg";
import { loadDemoProductionInfo } from "~/helper/loadDemoProductionInfo";
import Link from "next/link";

// information modal
import InformationModal from "~/components/global/InformationModal";

const getProductionInfo = async (userId) => {
  try {
    if (userId) {
      const response = await fetch(`/api/user/productions?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        return data.productionInfo;
      }
    }
  } catch (error) {
    throw new Error("Error fetching productions");
  }
};

const Home = () => {
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  // const [isProduction, setIsProduction] = useState(true);

  // information modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const user = useUser();
  const queryClient = useQueryClient();
  const { data: productionIds = [], isLoading } = useQuery({
    queryKey: ["productions", user?.user?.id],
    enabled: !!user?.user?.id,
    queryFn: () => getProductionInfo(user?.user?.id),
  });

  //   const production = useQuery({
  //   queryKey: ["production", productionId],
  //   enabled: !!productionId,
  //   queryFn: () => getProductionInfoById(productionId),
  // });

  //NOTE: this function is used to load the demo production info to the database
  // Function to handle the "Create Sample Production" button click
  const handleDemoClick = async () => {
    setIsProjectLoading(true);
    try {
      // Call the mutation function to create the demo production
      const mutationResult = await createDemoProductionMutation.mutateAsync();

      // Handle the result of the mutation if needed
      console.log("Mutation result:", mutationResult);

      setIsProjectLoading(false);
    } catch (error) {
      console.error("Error creating demo production:", error);
      setIsProjectLoading(false);
    }
  };

  // Define the mutation function to create a new production or load demo data
  const createDemoProductionMutation = useMutation(
    () => loadDemoProductionInfo(),
    {
      // onSuccess will be called when the mutation is successful
      onSuccess: () => {
        // Invalidate the productionIds query to trigger a revalidation
        queryClient.invalidateQueries("productions");
      },
    }
  );

  const router = useRouter();

  if (!user.isSignedIn) {
    console.log(router);
    // router.push("/sign-in");
    return <LoadingPage />;
  }

  const isProduction = productionIds.length > 0;

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-1 bg-arc lg:grid lg:grid-cols-2">
      {isInfoModalOpen && (
        <InformationModal
          heading={"Full Version Feature"}
          message={
            "This feature will be live in the full version. For demo purposes, please kindly select the 'Create Sample Production' button."
          }
          closeModalHandler={() => setIsInfoModalOpen(false)}
        />
      )}
      {/* --------------------------------------------------------- */}
      {/* LEFT COLUMN */}
      <div
        className="relative hidden lg:block"
        style={{
          backgroundImage: `url(${homePageImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <Image
          src={triangleMask}
          alt="triangle-mask"
          aria-hidden="true"
          className="absolute right-0 top-0 z-10 h-full w-auto"
        />
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
            // width={screen.width > 1024 ? 80 : 60}
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
          <p className="mt-4 text-contrast-dark lg:text-[16px]">
            Please first select a production to view or create a report.
          </p>
          <div
            id="production_items"
            className="mt-6 flex w-full flex-col gap-3 lg:mt-6 lg:gap-4"
          >
            {/* //map through productionIds and create a button for each one  */}
            {productionIds &&
              productionIds.map((production) => (
                <Link
                  key={production.id}
                  href={`/production/${production.id}/report`}
                  className="button w-full max-w-[400px] self-center border-[1.5px] border-primary-light bg-white py-2 text-sm font-bold text-primary-light hover:shadow-lg active:bg-primary-light active:text-white lg:py-3 lg:text-base "
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
          className={`mt-6 w-full lg:mt-[15%] ${isProduction ? "hidden" : ""}`}
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
          className="mt-4 min-w-[260px] self-center lg:mt-6 lg:min-w-[270px]"
          onClick={handleDemoClick}
          disabled={isProjectLoading}
        >
          {isProjectLoading ? "Loading..." : "Create Sample Production"}
        </Button>
        <Button
          buttonType={"Secondary"}
          onClick={() => setIsInfoModalOpen(true)}
          className="mt-4 min-w-[260px] self-center lg:mt-6 lg:min-w-[270px]"
          disabled={isProjectLoading}
        >
          Create New Production
        </Button>
      </div>
    </div>
  );
};

export default Home;
