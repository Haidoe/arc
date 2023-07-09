import React from 'react'
import TextInputField from '../TextInputField'

const RollsForm = () => {
  return (
    <form action="" className={`text-contrast-dark text-base font-normal `} >
      <div className="pb-2 border-b border-primary-base">
        <div className="grid grid-cols-6 grid-rows-2 gap-4 gap-y-2">
          <div className="grid col-span-2">Script Supervisor</div>
          <div className="grid col-span-4 font-bold">Harvey Spector</div>
          <div className="grid col-span-2">Data Wrangler</div>
          <div className="grid col-span-4 font-bold">John H.</div>
        </div>
      </div>

      <div className="grid grid-cols-6 grid-rows-4 gap-4 gap-y-2 pt-2">
        <div className="grid col-span-2"></div>
        <div className="font-bold">A Cam</div>
        <div className="font-bold">B Cam</div>
        <div className="font-bold">A Sound</div>
        <div className="font-bold">B Sound</div>
        <div className="grid col-span-2 font-bold">Previously</div>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <div className="grid col-span-2 font-bold">Today</div>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <div className="grid col-span-2 font-bold">To Date</div>
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
        <TextInputField maxLength="8" />
      </div>

    </form >
  )
}

export default RollsForm


// Script Supervisor Harvey Spector
// Data Wrangler 	John H.

// A Cam B Cam A sound B Sound
// Previously
// Today
// To Date