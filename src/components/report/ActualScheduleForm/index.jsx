import { useSelector } from 'react-redux'
import { useState } from 'react'

import TextInputField from '../../TextInputField'
import Accordion from '../Accordion'
import ActualScheduleModal from './ActualScheduleModal'

const ActualScheduleForm = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const data = useSelector((state) => state.productionReport.data)

  const actualSchedule = data.actualSchedule;

  const getValueOrDefault = (obj, property) => obj[property] ? obj[property] : ' ';

  const firstUnitSchedule = getValueOrDefault(actualSchedule.firstUnitInput, 'schedule');
  const firstUnitActual = getValueOrDefault(actualSchedule.firstUnitInput, 'actual');
  const secondUnitSchedule = getValueOrDefault(actualSchedule.secondUnitInput, 'schedule');
  const secondUnitActual = getValueOrDefault(actualSchedule.secondUnitInput, 'actual');
  const prepSchedule = getValueOrDefault(actualSchedule.prep, 'schedule');
  const prepActual = getValueOrDefault(actualSchedule.prep, 'actual');
  const travelSchedule = getValueOrDefault(actualSchedule.travel, 'schedule');
  const travelActual = getValueOrDefault(actualSchedule.travel, 'actual');
  const idleSchedule = getValueOrDefault(actualSchedule.idle, 'schedule');
  const idleActual = getValueOrDefault(actualSchedule.idle, 'actual');
  const holidaySchedule = getValueOrDefault(actualSchedule.holiday, 'schedule');
  const holidayActual = getValueOrDefault(actualSchedule.holiday, 'actual');


  //compute total schedule and actual
  const totalSchedule = firstUnitSchedule + secondUnitSchedule + prepSchedule + travelSchedule + idleSchedule + holidaySchedule;
  const totalActual = firstUnitActual + secondUnitActual + prepActual + travelActual + idleActual + holidayActual;


  return (
    <>
      <Accordion title="Actual Schedule" defaultOpen={true} className={`text-contrast-dark text-base ${className}`}>
        <div onClick={() => setIsOpen(true)}>
          <div className="grid grid-cols-3 gap-4  font-bold pb-2 border-b border-primary-base">
            <p>Title</p>
            <p>Schedule</p>
            <p>Actual</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-7 gap-4 gap-y-2 pt-2">
            <p>1st Unit</p>
            <TextInputField maxLength="8" label="firstUnitSchedule" value={firstUnitSchedule} />
            <TextInputField maxLength="8" label="firstUnitActual" value={firstUnitActual} />
            <p>2nd Unit</p>
            <TextInputField maxLength="8" label="secondUnitSchedule" value={secondUnitSchedule} />
            <TextInputField maxLength="8" label="secondUnitActual" value={secondUnitActual} />

            <p>Prep</p>
            <TextInputField maxLength="8" label="prepSchedule" value={prepSchedule} />
            <TextInputField maxLength="8" label="prepActual" value={prepActual} />
            <p>Travel</p>
            <TextInputField maxLength="8" label="travelSchedule" value={travelSchedule} />
            <TextInputField maxLength="8" label="travelActual" value={travelActual} />
            <p>Idle</p>

            <TextInputField maxLength="8" label="idleSchedule" value={idleSchedule} />
            <TextInputField maxLength="8" label="idleActual" value={idleActual} />
            <p>Holiday</p>
            <TextInputField maxLength="8" label="holidaySchedule" value={holidaySchedule} />
            <TextInputField maxLength="8" label="holidayActual" value={holidayActual} />
            <p>Total</p>
            <TextInputField maxLength="8" label="totalSchedule" value={totalSchedule} />
            <TextInputField maxLength="8" label="totalActual" value={totalActual} />

          </div>
        </div>
      </Accordion>

      <ActualScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>)

}

export default ActualScheduleForm
