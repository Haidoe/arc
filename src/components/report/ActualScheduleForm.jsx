import React from 'react'
import TextInputField from '../TextInputField'

const ActualScheduleForm = ({ className }) => {
  return (
    <form action="" className={` text-center ${className}`} >
      <div className="grid grid-cols-3 gap-4 text-lg font-bold">
        <p>Schedule</p>
        <p>vs</p>
        <p>Actual</p>
      </div>
      <div className='text-sm text-center'>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">1st Unit</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">2nd Unit</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">Prep</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">Travel</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">Idle</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">Holiday</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-contrast-light">
          <TextInputField maxLength="8" className="text-center" />
          <p className="text-sm">Total</p>
          <TextInputField maxLength="8" className="text-center" />
        </div>
      </div>
    </form >)
}

export default ActualScheduleForm