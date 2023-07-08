import React from 'react'
import TextInputField from '../TextInputField'

const ActualScheduleForm = ({ className }) => {


  return (
    <form action="" className={` ${className}`} >
      <div className="text-contrast-dark grid grid-cols-3 gap-4 text-base font-bold pb-2 border-b border-primary-base">
        <p>Title</p>
        <p>Schedule</p>
        <p>Actual</p>
      </div>
      <div className='text-sm grid pt-2 gap-1 text-contrast-dark'>
        <div className="grid  grid-cols-3 gap-4">
          <div className="text-sm">1st Unit</div>
          <TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-sm">2nd Unit</p> <TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-sm">Prep</p> <TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-sm">Travel</p><TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="text-sm">Idle</p><TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4 pb-2">
          <p className="text-sm">Holiday</p><TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-primary-base">
          <p className="text-sm">Total</p> <TextInputField maxLength="8" />

          <TextInputField maxLength="8" />
        </div>
      </div>
    </form >)
}

export default ActualScheduleForm