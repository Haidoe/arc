import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//Components
import Modal from '~/components/Modal'
import Accordion from "../Accordion";
import TextInputField from '~/components/TextInputField'

//redux
import { updateActualSchedule } from '~/redux/features/ProductionReportSlice'

const ActualScheduleModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.productionReport.data)

  //For default value of the input field
  const actualSchedule = data.actualSchedule;

  const getValueOrDefault = (obj, property) => obj[property] ? obj[property] : ' ';

  const firstUnitSchedule = getValueOrDefault(actualSchedule.firstUnitInput, 'schedule');
  console.log(firstUnitSchedule)


  // const firstUnitActual = getValueOrDefault(actualSchedule.firstUnitInput, 'actual');
  // const secondUnitSchedule = getValueOrDefault(actualSchedule.secondUnitInput, 'schedule');
  // const secondUnitActual = getValueOrDefault(actualSchedule.secondUnitInput, 'actual');
  // const prepSchedule = getValueOrDefault(actualSchedule.prep, 'schedule');
  // const prepActual = getValueOrDefault(actualSchedule.prep, 'actual');
  // const travelSchedule = getValueOrDefault(actualSchedule.travel, 'schedule');
  // const travelActual = getValueOrDefault(actualSchedule.travel, 'actual');
  // const idleSchedule = getValueOrDefault(actualSchedule.idle, 'schedule');
  // const idleActual = getValueOrDefault(actualSchedule.idle, 'actual');
  // const holidaySchedule = getValueOrDefault(actualSchedule.holiday, 'schedule');
  // const holidayActual = getValueOrDefault(actualSchedule.holiday, 'actual');

  const firstUnitScheduleRef = useRef(firstUnitSchedule);


  // const firstUnitActualRef = useRef(firstUnitActual);
  // const secondUnitScheduleRef = useRef(secondUnitSchedule);
  // const secondUnitActualRef = useRef(secondUnitActual);
  // const prepScheduleRef = useRef(prepSchedule);
  // const prepActualRef = useRef(prepActual);
  // const travelScheduleRef = useRef(travelSchedule);
  // const travelActualRef = useRef(travelActual);
  // const idleScheduleRef = useRef(idleSchedule);
  // const idleActualRef = useRef(idleActual);
  // const holidayScheduleRef = useRef(holidaySchedule);
  // const holidayActualRef = useRef(holidayActual);



  //handle redux update
  const handleReduxUpdate = () => {
    if (firstUnitScheduleRef.current?.value) {

      let actualSchedule = {
        ...data.actualSchedule,
        firstUnitInput: {
          schedule: firstUnitScheduleRef.current?.value,
        }
      }

      //updating the actualSchedule object
      console.log("Before update", actualSchedule)
      dispatch(updateActualSchedule(actualSchedule))
      console.log("After update", actualSchedule)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleReduxUpdate}>
      <div className="w-[50vw] mx-[-25vw]">
        <Accordion
          title="Schedule of the Day"
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
        >
          <div>
            <div className="grid grid-cols-3 gap-4  font-bold pb-2 border-b border-primary-base">
              <p>Title</p>
              <p>Schedule</p>
              <p>Actual</p>
            </div>
            <div className="grid grid-cols-3 grid-rows-7 gap-4 gap-y-2 pt-2">
              <p>1st Unit</p>
              <TextInputField maxLength="8"
                ref={firstUnitScheduleRef} defaultValue={firstUnitSchedule} />

              {/* <TextInputField maxLength="8"
                ref={firstUnitActualRef} defaultValue={firstUnitActual} />
              <p>2nd Unit</p>
              <TextInputField maxLength="8"
                ref={secondUnitScheduleRef} defaultValue={secondUnitSchedule} />
              <TextInputField maxLength="8"
                ref={secondUnitActualRef} defaultValue={secondUnitActual} /> */}

              {/* <p>Prep</p>
              <TextInputField maxLength="8"
                ref={prepScheduleRef} defaultValue={prepSchedule} />
              <TextInputField maxLength="8"
                ref={prepActualRef} defaultValue={prepActual} />
              <p>Travel</p>
              <TextInputField maxLength="8"
                ref={travelScheduleRef} defaultValue={travelSchedule} />
              <TextInputField maxLength="8"
                ref={travelActualRef} defaultValue={travelActual} />
              <p>Idle</p>
              <TextInputField maxLength="8"
                ref={idleScheduleRef} defaultValue={idleSchedule} />
              <TextInputField maxLength="8"
                ref={idleActualRef} defaultValue={idleActual} />
              <p>Holiday</p>
              <TextInputField maxLength="8"
                ref={holidayScheduleRef} defaultValue={holidaySchedule} />
              <TextInputField maxLength="8"
                ref={holidayActualRef} defaultValue={holidayActual} />
              <p>Total</p>
              <TextInputField maxLength="8" readOnly={true} defaultValue={totalSchedule} />
              <TextInputField maxLength="8" readOnly={true} defaultValue={totalActual} /> */}
            </div>
          </div>
        </Accordion>
      </div>
    </Modal >

  )
}

export default ActualScheduleModal;