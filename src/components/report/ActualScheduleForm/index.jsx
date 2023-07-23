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
          <div className="grid grid-cols-3 gap-4 text-contrast-dark gap-y-4 font-bold pb-2 border-b text-base border-primary-base">
            <p tabIndex="-1">Title</p>
            <p tabIndex="-1">Schedule</p>
            <p tabIndex="-1">Actual</p>
          </div>
          <div className="grid text-contrast-dark font-bold gap-4 gap-y-4 pt-2 text-base">
            <div className='grid grid-cols-3 gap-4'>
              <p>1st Unit</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`firstUnitSchedule-${firstUnitSchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                defaultValue={firstUnitSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`firstUnitActual-${firstUnitActual ?? 0}`}
                maxLength="8"
                label="firstUnitActual"
                className="underline-form"
                defaultValue={firstUnitActual} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p>2nd Unit</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`secondUnitSchedule-${secondUnitSchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="secondUnitSchedule"
                defaultValue={secondUnitSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`secondUnitActual-${secondUnitActual ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="secondUnitActual"
                defaultValue={secondUnitActual} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p>Prep</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`prepSchedule-${prepSchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="prepSchedule"
                defaultValue={prepSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`prepActual-${prepActual ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="prepActual"
                defaultValue={prepActual} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p>Travel</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`travelSchedule-${travelSchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="travelSchedule"
                defaultValue={travelSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`travelActual-${travelActual ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="travelActual"
                defaultValue={travelActual} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p>Idle</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`idleSchedule-${idleSchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="idleSchedule"
                defaultValue={idleSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`idleActual-${idleActual ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="idleActual"
                defaultValue={idleActual} />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p>Holiday</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`holidaySchedule-${holidaySchedule ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="holidaySchedule"
                defaultValue={holidaySchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`holidayActual-${holidayActual ?? 0}`}
                maxLength="8"
                className="underline-form"
                label="holidayActual"
                defaultValue={holidayActual} />
            </div>
            <div className='grid grid-cols-3 gap-4 file border-t border-primary-base py-2'>
              <p>Total</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`totalSchedule-${totalSchedule ?? 0}`}
                maxLength="8"
                label="totalSchedule"
                defaultValue={totalSchedule} />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`totalActual-${totalActual ?? 0}`}
                maxLength="8"
                label="totalActual"
                defaultValue={totalActual} />
            </div>
          </div>
        </div>
      </Accordion >

      <ActualScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>)

}

export default ActualScheduleForm
