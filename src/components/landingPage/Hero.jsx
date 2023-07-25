import React from 'react'
import Image from 'next/image'

//components
import LogoMobile from '~/assets/icons/LogoMobile.svg'
import Button from '~/components/Button'
import Primary from '../Button/Primary'
import appImagePlaceholder from '~/../public/images/landing-page/appImagePlaceholder.jpg'


const Hero = () => {
  return (

    //padding left and right mobile = px-6
    //padding left and right tablet = px-12
    //padding left and right desktop = px-36
    //padding top and bottom mobile = pt-12 pb-14
    //padding top and bottom tablet = pt-16 pb-20
    //padding top and bottom desktop = pt-20 pb-24
    <div className='text-contrast-base pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24 px-6 md:px-12 lg:px-36 gap-y-10 md:gap-y-16 flex flex-col items-center bg-gradient-to-bl  from-primary-light/40 from-35% via-blue-600/40 via-50% to-primary-dark/50 to-80%'>

      <Image src={LogoMobile} alt="Logo" className='w-[100px] md:w-[140px] lg:w-[186px]' />
      <div className='flex flex-col px-4 gap-2 md:gap-4 lg:gap-6 text-center'>
        <h1 className='text-xl md:text-3xl lg:text-6xl leading-7 '>Film producing like never before</h1>
        <p className='text-sm md:text-lg lg:text-[32px]'>Unlock your creativity and bring your stories to life with Arc.</p>
      </div>
      <Button buttonType={Primary}>Get Started</Button>
      <Image src={appImagePlaceholder} alt="App Image" className=' max-w-[80%] shadow-lg shadow-contrast-base/30' />
    </div>

  )
}

export default Hero