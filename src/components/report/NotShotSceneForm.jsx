import React from 'react'
import TextInputField from '../TextInputField'
import Button from '../Button'

const NotShotSceneForm = ({ className }) => {

  const sss = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';
  const rrr = '1';

  return (
    <form action="" className={` text-contrast-dark text-base font-normal ${className}`} >
      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-primary-base">
        <p className='font-bold grid grid-cols-1'>Scene No.</p>
        <p className='font-bold'>Reason</p>
      </div>
      <div className='pt-2 grid grid-cols-3 grid-rows-4 gap-4 gap-y-2'>
        <TextInputField
          key={`rrr-${1 ?? 0}`}
          className=" align-top"
          maxLength="8" defaultValue={rrr} />
        <TextInputField
          key={`sss-${sss ?? 0}`}
          className="grid w-full col-span-2" maxLength="50"
          defaultValue={sss} />
      </div>
      <div className="flex justify-end gap-4 mt-2 pt-4 border-t border-primary-base">
        <Button buttonType="Secondary" className="px-2 py-1" >Create New Line</Button>
      </div>
    </form >
  )
}

export default NotShotSceneForm