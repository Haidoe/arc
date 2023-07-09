import React from 'react'
import TextInputField from '../TextInputField'

const ActualScheduleForm = ({ className }) => {


  return (
    <form action="" className={`text-contrast-dark text-base ${className}`} >
      <div className="grid grid-cols-3 gap-4  font-bold pb-2 border-b border-primary-base">
        <p>Title</p>
        <p>Schedule</p>
        <p>Actual</p>
      </div>
      <div className="grid grid-cols-3 grid-rows-7 gap-4 gap-y-2 pt-2">
        <p>1st Unit</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <p>2nd Unit</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />

        <p>Prep</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <p>Travel</p>
        <TextInputField maxLength="8" />

        <TextInputField maxLength="8" />
        <p>Idle</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <p>Holiday</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <p>Total</p>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
      </div>
    </form >)
}

export default ActualScheduleForm