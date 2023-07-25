import { useSelector } from 'react-redux'
import { useState } from 'react'

import TextInputField from '../../TextInputField'
import Accordion from '../Accordion'
import ActualScheduleModal from './ActualScheduleModal'

const ActualScheduleForm = ({ className, isReadOnly }) => {
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
        <div onClick={() => {
          if (isReadOnly) return;
          setIsOpen(true);
        }}>
          <div className="grid grid-cols-3 gap-4 text-contrast-dark gap-y-4 font-bold pb-2 border-b text-base border-primary-base">
            <p tabIndex="-1">Title</p>
            <p tabIndex="-1">Schedule</p>
            <p tabIndex="-1">Actual</p>
          </div>
          <div className="grid text-contrast-dark font-bold text-base divide-y divide-contrast-lighter">
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">1st Unit</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`firstUnitSchedule-${firstUnitSchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                defaultValue={firstUnitSchedule}
                readOnly="true"
              />

              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`firstUnitActual-${firstUnitActual ?? 0}`}
                maxLength="2"
                label="firstUnitActual"
                className="underline-form"
                defaultValue={firstUnitActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">2nd Unit</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`secondUnitSchedule-${secondUnitSchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="secondUnitSchedule"
                defaultValue={secondUnitSchedule}
                readOnly="true"
              />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`secondUnitActual-${secondUnitActual ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="secondUnitActual"
                defaultValue={secondUnitActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">Prep</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`prepSchedule-${prepSchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="prepSchedule"
                defaultValue={prepSchedule}
                readOnly="true"
              />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`prepActual-${prepActual ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="prepActual"
                defaultValue={prepActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">Travel</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`travelSchedule-${travelSchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="travelSchedule"
                defaultValue={travelSchedule}
                readOnly="true"
              />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`travelActual-${travelActual ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="travelActual"
                defaultValue={travelActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">Idle</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`idleSchedule-${idleSchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="idleSchedule"
                defaultValue={idleSchedule}
                readOnly="true"
              />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`idleActual-${idleActual ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="idleActual"
                defaultValue={idleActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 py-2.5'>
              <p className="m-0 p-0">Holiday</p>
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`holidaySchedule-${holidaySchedule ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="holidaySchedule"
                defaultValue={holidaySchedule}
                readOnly="true"
              />
              <TextInputField
                tabIndex="-1"
                placeholder="0"
                key={`holidayActual-${holidayActual ?? 0}`}
                maxLength="2"
                className="underline-form"
                label="holidayActual"
                defaultValue={holidayActual}
                readOnly="true"
              />
            </div>
            <div className='grid grid-cols-3 gap-4 pt-3'>
              <p className="m-0 p-0">Total</p>
              <p className="m-0 p-0">{totalSchedule}</p>
              <p className="m-0 p-0">{totalActual}</p>
            </div>
          </div>
        </div>
      </Accordion >

      <ActualScheduleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>)

}

export default ActualScheduleForm
