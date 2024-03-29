import React from "react";
import Image from "next/image";
// const aboutDesktop = '/public/images/landingPage/aboutDesktop.png'
// const aboutMobile = '/public/images/landingPage/aboutMobilePhoto.png'

import aboutDesktop from '~/../public/images/landing-page/aboutDesktopFull.png'
import aboutMobile from '~/../public/images/landing-page/aboutMobile-new.svg'
import triangleMask from '~/../public/images/landing-page/triangleMask.png'

const About = () => {
  return (
    <div id="about" className='grid md:grid-cols-2 overflow-hidden bg-arc'>
      <div className="relative">
        <Image src={triangleMask} alt="triangle-mask" aria-hidden="true" className="absolute z-10 top-0 right-0 h-full w-auto" />
        <Image src={aboutDesktop} alt='' aria-hidden='true' className='hidden relative w-full h-full md:block'
          style={
            {
              objectFit: 'cover',
              objectPosition: 'right',
            }
          } />
      </div>
      <div className='text-contrast-base pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 px-6 md:px-12 lg:px-28 flex flex-col gap-y-2 md:gap-4 lg:gap-6 self-center '>
        <h2 className='text-xl md:text-3xl xl:text-5xl text-primary-dark font-bold'>About</h2>
        <p className='text-sm md:text-lg xl:text-[28px] '>Introducing Arc app, a comprehensive and user-friendly tool designed to revolutionize the way you manage and oversee film projects. With its intuitive interface, you can effortlessly organize scripts, budgets, shooting schedules, and casting details all in one place. Streamline communication with your team by easily sharing updates, files, and feedback, ensuring everyone stays on the same page.</p>
      </div>
      <div className="max-h-[130px]">
        <Image
          src={aboutMobile}
          alt=""
          aria-hidden="true"
          className="w-full md:hidden"
        />
      </div>
    </div>
  );
};

export default About;
