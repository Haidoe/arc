// react essentials
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// api
import { getProductionFinishRate } from "~/service/dashboard";

// components
import LoadingSpinner from "~/components/Loading";
import ProgressChart from "./Chart";
import DropDown from "~/components/global/DropDown";
import Calendar from "~/assets/icons/Calendar.svg";

// constants
const STATUS = {
  good: "The shooting is on track to finish on time.",
  warning: "The shooting's progress is slower than expected.",
  danger: "The shooting is severely behind schedule.\nUrgent action is required",
};

const LoadingDiv = () => (
  <div className="flex h-[200px] flex-col items-center justify-center">
    <LoadingSpinner size={40} />
    <span className="text-primary-light">Retrieving data...</span>
  </div>
);

const getStatusMessage = (rate) => {
  if (rate <= 80) {
    return STATUS.good;
  } else if (rate <= 100) {
    return STATUS.warning;
  } else {
    return STATUS.danger;
  }
};

// 0 offset means today, 1 offset means yesterday
// returns end of the day of local in ISO format
function offsetDate(negativeOffset) {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() - negativeOffset);
  newDate.setHours(23, 59, 59, 999);
  const isoString = newDate.toISOString();
  return isoString;
}

// returns an array of dates from startDate to today
function getDatesFromSpecificDateToEnd(startDateStr) {
  const startDate = new Date(startDateStr);
  const currentDate = new Date();
  const datesArray = [];

  while (startDate <= currentDate) {
    datesArray.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  datesArray.reverse();

  return datesArray;
}

function datesInDropDownFormat(datesArray) {
  const dropdownformat = datesArray.map((date, idx) => {
    return { name: date.toLocaleDateString(), offset: idx + 1 };
  });

  console.clear();
  const includeToday = [
    {
      name: new Date().toLocaleDateString(),
      offset: 0,
    },
    ...dropdownformat,
  ];

  return includeToday;
}

const ProgressSection = () => {
  const router = useRouter();
  const { productionId } = router.query;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    name: new Date().toLocaleDateString(),
    offset: 0,
  });
  const [dropdownDates, setDropdownDates] = useState([selectedDate]);

  // fetch data

  const fetchData = async (uptoISO) => {
    try {
      const response = await getProductionFinishRate(productionId, uptoISO);
      console.log(response);
      setData(response);

      // parse and set dropdown dates until today
      const startDate = response.startDate;
      const allDatesArray = getDatesFromSpecificDateToEnd(startDate);
      const dropdownDatesArray = datesInDropDownFormat(allDatesArray);
      console.log(dropdownDatesArray);
      setDropdownDates(dropdownDatesArray);
    } catch (error) {
      console.log("Finish rate error >> ", error);
    } finally {
      setLoading(false);
    }
  };

  function recomputeGraph(z) {
    setLoading(true);
    const uptoTodayEndISO = offsetDate(z.offset);
    fetchData(uptoTodayEndISO);
    setSelectedDate(z);
  }

  useEffect(() => {
    const uptoTodayEndISO = offsetDate(0);
    console.log(uptoTodayEndISO);
    // const isoString = uptoToday.toISOString();
    fetchData(uptoTodayEndISO);
  }, []);

  return (
    <div className="flex flex-col gap-6 rounded-[5px] bg-arc lg:flex-row lg:gap-4">
      <div className="flex flex-1 flex-col gap-4 lg:gap-9">
        <p className="flex flex-1 flex-col text-center text-lg whitespace-pre-wrap text-contrast-dark lg:justify-center lg:text-left lg:text-xl">
          {getStatusMessage(data?.finishRateAvg)}
        </p>

        <div className="items-left flex flex-col justify-end">
          <p className="text-center lg:text-left">Production Progress by</p>

          <div className=" ml-[-8px] flex justify-center lg:ml-[-16px] lg:justify-start">
            {/* Dropdown list */}
            <div className="relative z-10  ml-8 pl-[12px]">
              <Image
                src={Calendar}
                alt="calendar"
                height={36}
                className="absolute bottom-0 left-[-1rem] z-10"
              />

              <DropDown
                people={dropdownDates}
                selected={selectedDate}
                setSelected={(z) => {
                  recomputeGraph(z);
                }}
                inputClassName="pl-2"
                width="medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="right-segment flex flex-1 flex-col  gap-9 align-middle lg:w-[50%]">
        {isLoading ? (
          <LoadingDiv />
        ) : (
          <div className="flex justify-center">
            <ProgressChart details={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressSection;
