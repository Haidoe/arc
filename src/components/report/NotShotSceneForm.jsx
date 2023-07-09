import React from 'react'
import TextInputField from '../TextInputField'
import Button from '../Button'
import TextArea from '../TextArea'

const NotShotSceneForm = ({ className }) => {


  return (
    <form action="" className={` text-contrast-dark text-base font-normal ${className}`} >
      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-primary-base">
        <p className='font-bold grid grid-cols-1'>Scene No.</p>
        <p className='font-bold'>Reason</p>
      </div>
      <div className='pt-2 grid grid-cols-3 grid-rows-4 gap-4 gap-y-2'>
        <TextInputField className=" align-top" maxLength="8" value="1" />
        <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        <TextInputField className=" align-top" maxLength="8" value="1" />
        <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        <TextInputField className=" align-top" maxLength="8" value="1" />
        <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        <TextInputField className=" align-top" maxLength="8" value="1" />
        <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
      </div>
      <div className="flex justify-end gap-4 mt-2 pt-4 border-t border-primary-base">
        <Button buttonType="Secondary" className="px-2 py-1" >Create New Line</Button>
      </div>
    </form >
  )
}

export default NotShotSceneForm