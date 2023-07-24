import React from 'react'
import Image from 'next/image'
import LogoOffWhite from '~/assets/icons/LogoOffWhite.svg'

const Footer = () => {
  return (
    <>
      <div className=' bg-primary-dark text-arc'>
        <div className='p-10 flex flex-col items-center lg:items-start '>
          <Image src={LogoOffWhite} alt="Logo" height={40} className='mb-2' />
          <div>ARC App, For Film Producer.</div>
        </div>
      </div>
    </>

  )
}

export default Footer