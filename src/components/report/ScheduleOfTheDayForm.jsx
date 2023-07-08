import TimeInputField from "../TimeInputField";


const ScheduleOfTheDayForm = ({ className }) => {
  return (
    <form action="" className={`{} ${className}`}>
      <div className="flex justify-between border-b border-primary-base pb-3">
        <p className="font-bold text-tertiary-dark">Tue Jun 27, 2023</p>
      </div>
      <div className="pt-3 grid grid-cols-3 gap-4 font-bold text-contrast-base">
        <div></div>
        <p>Start</p>
        <p>End</p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold text-contrast-base">Breakfast</p>
          <TimeInputField label="Time In" />
          <TimeInputField label="Time Out" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold text-contrast-base">Crew Call</p>
          <TimeInputField label="Time In" />
          <TimeInputField label="Time Out" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold text-contrast-base">Shooting Call</p>
          <TimeInputField label="Time In" />
          <TimeInputField label="Time Out" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <p className="font-bold text-contrast-base">Lunch</p>
          <TimeInputField label="Time In" />
          <TimeInputField label="Time Out" />
        </div>
      </div>
    </form>
  )
}


export default ScheduleOfTheDayForm