import React from 'react'
import TextInputField from '../TextInputField'
import Button from '../Button'
import TextArea from '../TextArea'

const NotShotSceneForm = ({ className }) => {


  return (
    <form action="" className={` ${className}`} >
      <div className="text-contrast-dark grid grid-cols-3 gap-4 text-base font-bold pb-2 border-b border-primary-base">
        <p>Scene No.</p>
        <p>Reason</p>
      </div>
      <div className='text-sm pt-2 gap-2 text-contrast-dark'>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField className=" align-top" maxLength="8" value="1" />
          <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField className=" align-top" maxLength="8" value="1" />
          <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField className=" align-top" maxLength="8" value="1" />
          <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField className=" align-top" maxLength="8" value="1" />
          <TextInputField className="grid w-full col-span-2" maxLength="50" value="Lorem ipsum dolor sit amet conatum" />
        </div>
        <div className="flex justify-end gap-4 mt-2 pt-4 border-t border-primary-base">
          <Button buttonType="Secondary" className="px-2 py-1" >Create New Line</Button>
        </div>
      </div>

    </form >
  )
}

export default NotShotSceneForm