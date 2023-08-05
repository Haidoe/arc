import React from "react";
import Image from "next/image";

//components
import LogoMobile from "~/assets/icons/LogoMobile.svg";
import appImagePlaceholder from "~/../public/images/landing-page/appImagePlaceholder.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    //padding left and right mobile = px-6
    //padding left and right tablet = px-12
    //padding left and right desktop = px-36
    //padding top and bottom mobile = pt-12 pb-14
    //padding top and bottom tablet = pt-16 pb-20
    //padding top and bottom desktop = pt-20 pb-24
    <div
      id="filmProduction"
      className="flex flex-col items-center gap-y-10 bg-gradient-to-bl from-primary-light/40 from-35% via-blue-600/40 via-50% to-primary-dark/50 to-80% px-6 pb-14 pt-12 text-contrast-base md:gap-y-16  md:px-12 md:pb-20 md:pt-16 lg:px-36 lg:pb-24 lg:pt-20"
    >
      <Image
        src={LogoMobile}
        alt="Logo"
        className="w-[100px] md:w-[140px] lg:w-[186px]"
      />
      <div className="flex flex-col gap-2 px-4 text-center md:gap-4 lg:gap-6">
        <h1 className="text-xl leading-7 md:text-3xl lg:text-6xl ">
          Film producing like never before
        </h1>
        <p className="text-sm md:text-lg lg:text-[32px]">
          Unlock your creativity and bring your stories to life with Arc.
        </p>
      </div>
      <Link
        className="active-border-primary-base rounded-[5px] border-[1.5px] border-primary-base bg-primary-base px-4 py-2 text-sm font-bold text-white hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-base active:bg-primary-base active:shadow-inner lg:px-8 lg:py-3 lg:text-base"
        href="/sign-in"
      >
        Get Started
      </Link>
      <Image
        src={appImagePlaceholder}
        alt="App Image"
        className=" max-w-[80%] shadow-lg shadow-contrast-base/30"
      />
    </div>
  );
};

export default Hero;
