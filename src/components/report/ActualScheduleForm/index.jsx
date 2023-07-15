import { useSelector } from 'react-redux'
import { useState } from 'react'

import TextInputField from '../../TextInputField'
import Accordion from '../Accordion'
import ActualScheduleModal from './ActualScheduleModal'

const ActualScheduleForm = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)

  const data = useSelector((state) => state.productionReport.data)

  const actualSchedule = data.actualSchedule;

  const getValueOrDefault = (obj, property) => obj[property] ? obj[property] : '';

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


  //compute total schedule and actual for the summary and parse to number before adding
  const totalSchedule = Number(firstUnitSchedule) + Number(secondUnitSchedule) + Number(prepSchedule) + Number(travelSchedule) + Number(idleSchedule) + Number(holidaySchedule);
  const totalActual = Number(firstUnitActual) + Number(secondUnitActual) + Number(prepActual) + Number(travelActual) + Number(idleActual) + Number(holidayActual);

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
            <TextInputField
              key={`firstUnitSchedule-${firstUnitSchedule ?? 0}`}
              maxLength="8"
              label="firstUnitSchedule"
              //if the value is empty, display 0 instead
              defaultValue={firstUnitSchedule === '' ? '0' : firstUnitSchedule} />
            <TextInputField
              key={`firstUnitActual-${firstUnitActual ?? 0}`}
              maxLength="8"
              label="firstUnitActual"
              defaultValue={firstUnitActual === '' ? '0' : firstUnitActual} />
            <p>2nd Unit</p>
            <TextInputField
              key={`secondUnitSchedule-${secondUnitSchedule ?? 0}`}
              maxLength="8"
              label="secondUnitSchedule"
              defaultValue={secondUnitSchedule === '' ? '0' : secondUnitSchedule} />
            <TextInputField
              key={`secondUnitActual-${secondUnitActual ?? 0}`}
              maxLength="8"
              label="secondUnitActual"
              defaultValue={secondUnitActual === '' ? '0' : secondUnitActual} />
            <p>Prep</p>
            <TextInputField
              key={`prepSchedule-${prepSchedule ?? 0}`}
              maxLength="8"
              label="prepSchedule"
              defaultValue={prepSchedule === '' ? '0' : prepSchedule} />
            <TextInputField
              key={`prepActual-${prepActual ?? 0}`}
              maxLength="8"
              label="prepActual"
              defaultValue={prepActual === '' ? '0' : prepActual} />
            <p>Travel</p>
            <TextInputField
              key={`travelSchedule-${travelSchedule ?? 0}`}
              maxLength="8"
              label="travelSchedule"
              defaultValue={travelSchedule === '' ? '0' : travelSchedule} />
            <TextInputField
              key={`travelActual-${travelActual ?? 0}`}
              maxLength="8"
              label="travelActual"
              defaultValue={travelActual === '' ? '0' : travelActual} />
            <p>Idle</p>
            <TextInputField
              key={`idleSchedule-${idleSchedule ?? 0}`}
              maxLength="8"
              label="idleSchedule"
              defaultValue={idleSchedule === '' ? '0' : idleSchedule} />
            <TextInputField
              key={`idleActual-${idleActual ?? 0}`}
              maxLength="8"
              label="idleActual"
              defaultValue={idleActual === '' ? '0' : idleActual} />
            <p>Holiday</p>
            <TextInputField
              key={`holidaySchedule-${holidaySchedule ?? 0}`}
              maxLength="8"
              label="holidaySchedule"
              defaultValue={holidaySchedule === '' ? '0' : holidaySchedule} />
            <TextInputField
              key={`holidayActual-${holidayActual ?? 0}`}
              maxLength="8"
              label="holidayActual"
              defaultValue={holidayActual === '' ? '0' : holidayActual} />
            <p>Total</p>
            <TextInputField
              key={`totalSchedule-${totalSchedule ?? 0}`}
              maxLength="8"
              label="totalSchedule"
              defaultValue={totalSchedule === '' ? '0' : totalSchedule} />
            <TextInputField
              key={`totalActual-${totalActual ?? 0}`}
              maxLength="8"
              label="totalActual"
              defaultValue={totalActual === '' ? '0' : totalActual} />

          </div>
        </div>
      </Accordion>

      <ActualScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>)

}

export default ActualScheduleForm
