import Image from "next/image";

const LandingPageFeature = () => {
  return (
    <section
      id="features"
      className="relative flex flex-col gap-8 bg-arc p-12 px-6 lg:items-center lg:gap-12 lg:px-12 lg:py-28"
    >
      <h2 className="z-10 text-xl font-bold text-primary-dark lg:text-center lg:text-5xl">
        Features
      </h2>

      <p className="z-10 text-sm lg:px-[10%] lg:text-center lg:text-xl">
        Empowering filmmakers with cutting-edge tools, seamless collaboration,
        and limitless possibilities for bringing their visions to the screen.
      </p>

      <ul className="z-10 flex max-w-[1280px] flex-col gap-4 lg:mt-4 lg:grid lg:grid-cols-3 lg:gap-8">
        <li className="flex gap-4 lg:flex-col lg:items-center">
          <div className="relative h-[72px] w-[72px]  lg:h-[144px] lg:w-[144px]">
            <Image
              src="/images/landing-page/features/callsheets.png"
              alt="Production Calls Sheets"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center text-base lg:justify-center lg:gap-6">
            <h3 className="font-bold lg:text-center lg:text-xl">
              Production Calls Sheets
            </h3>
            <p className="lg:text-center lg:text-lg">
              Create the planning for your film production.
            </p>
          </div>
        </li>

        <li className="flex gap-4 lg:flex-col lg:items-center">
          <div className="relative h-[72px] w-[72px]  lg:h-[144px] lg:w-[144px]">
            <Image
              src="/images/landing-page/features/production.png"
              alt="Production Report"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center text-base lg:justify-center lg:gap-6">
            <h3 className="font-bold lg:text-center lg:text-xl">
              Production Reports
            </h3>
            <p className="lg:text-center lg:text-lg">
              A smooth control and management experience for any producer.
            </p>
          </div>
        </li>

        <li className="flex gap-4 lg:flex-col lg:items-center">
          <div className="relative h-[72px] w-[72px]  lg:h-[144px] lg:w-[144px]">
            <Image
              src="/images/landing-page/features/dashboard.png"
              alt="Dashboard Icon"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center text-base lg:justify-center lg:gap-6">
            <h3 className="font-bold lg:text-center lg:text-xl">Dashboards</h3>
            <p className="lg:text-center lg:text-lg">
              Analyze and compare information about the status of your
              production.
            </p>
          </div>
        </li>
      </ul>

      {/* Subtle gradient purple background */}
      <Image
        alt="Subtle gradient purple background"
        src="/images/landing-page/feature-bg-1.svg"
        width={800}
        height={800}
        className="absolute right-0 top-0"
      />

      {/* Subtle gradient purple background */}
      <Image
        alt="Subtle gradient purple background"
        src="/images/landing-page/feature-bg-2.svg"
        width={800}
        height={800}
        className="absolute bottom-[-75%] left-0 hidden lg:block"
      />
    </section>
  );
};

export default LandingPageFeature;
