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
      <Accordion title="Actual Schedule" defaultOpen={true} className={`text-contrast-dark ${className}`}>
        <div onClick={() => setIsOpen(true)}>
          <div className="grid grid-cols-3 gap-4 font-bold pb-2 border-b border-primary-base">
            <p>Title</p>
            <p>Schedule</p>
            <p>Actual</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-7 gap-4 gap-y-2 pt-2">
            <p>1st Unit</p>
            <TextInputField
              placeholder="0"
              key={`firstUnitSchedule-${firstUnitSchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              defaultValue={firstUnitSchedule} />

            <TextInputField
              placeholder="0"
              key={`firstUnitActual-${firstUnitActual ?? 0}`}
              maxLength="8"
              label="firstUnitActual"
              className="underline-form"
              defaultValue={firstUnitActual} />
            <p>2nd Unit</p>
            <TextInputField
              placeholder="0"
              key={`secondUnitSchedule-${secondUnitSchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="secondUnitSchedule"
              defaultValue={secondUnitSchedule} />
            <TextInputField
              placeholder="0"
              key={`secondUnitActual-${secondUnitActual ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="secondUnitActual"
              defaultValue={secondUnitActual} />
            <p>Prep</p>
            <TextInputField
              placeholder="0"
              key={`prepSchedule-${prepSchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="prepSchedule"
              defaultValue={prepSchedule} />
            <TextInputField
              placeholder="0"
              key={`prepActual-${prepActual ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="prepActual"
              defaultValue={prepActual} />
            <p>Travel</p>
            <TextInputField
              placeholder="0"
              key={`travelSchedule-${travelSchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="travelSchedule"
              defaultValue={travelSchedule} />
            <TextInputField
              placeholder="0"
              key={`travelActual-${travelActual ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="travelActual"
              defaultValue={travelActual} />
            <p>Idle</p>
            <TextInputField
              placeholder="0"
              key={`idleSchedule-${idleSchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="idleSchedule"
              defaultValue={idleSchedule} />
            <TextInputField
              placeholder="0"
              key={`idleActual-${idleActual ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="idleActual"
              defaultValue={idleActual} />
            <p>Holiday</p>
            <TextInputField
              placeholder="0"
              key={`holidaySchedule-${holidaySchedule ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="holidaySchedule"
              defaultValue={holidaySchedule} />
            <TextInputField
              placeholder="0"
              key={`holidayActual-${holidayActual ?? 0}`}
              maxLength="8"
              className="underline-form"
              label="holidayActual"
              defaultValue={holidayActual} />
            <p>Total</p>
            <TextInputField
              placeholder="0"
              key={`totalSchedule-${totalSchedule ?? 0}`}
              maxLength="8"
              label="totalSchedule"
              defaultValue={totalSchedule} />
            <TextInputField
              placeholder="0"
              key={`totalActual-${totalActual ?? 0}`}
              maxLength="8"
              label="totalActual"
              defaultValue={totalActual} />
          </div>
        </div>
      </Accordion>

      <ActualScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>)

}

export default ActualScheduleForm
