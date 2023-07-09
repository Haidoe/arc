import TimeInputField from "../TimeInputField";


const ScheduleOfTheDayForm = ({ className }) => {
  return (
    <form action="" className={` text-contrast-dark text-base ${className}`}>
      <div className="flex justify-between border-b border-primary-base pb-2">
        <p className="font-bold text-base text-tertiary-dark">Tue Jun 27, 2023</p>
      </div>
      <div className="pt-2 grid grid-cols-3 grid-rows-5 gap-4 gap-y-2">
        <div></div>
        <p className="font-bold">Start</p>
        <p className="font-bold">End</p>

        <p className="font-bold ">Breakfast</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />

        <p className="font-bold">Crew Call</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />

        <p className="font-bold">Shooting Call</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />

        <p className="font-bold">Lunch</p>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>

    </form>
  )
}


export default ScheduleOfTheDayForm