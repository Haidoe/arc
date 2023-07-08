import TimeInputField from "../TimeInputField";


const ScheduleOfTheDayForm = () => {
  return (
    <form action="">
      <div className="grid grid-cols-3 gap-4">
        <div></div>
        <div>Time In</div>
        <div>Time Out</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>Breakfast</div>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>Crew call</div>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>Shooting Call</div>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>Lunch</div>
        <TimeInputField label="Time In" />
        <TimeInputField label="Time Out" />
      </div>
    </form>
  )
}


export default ScheduleOfTheDayForm