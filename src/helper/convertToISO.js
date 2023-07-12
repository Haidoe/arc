import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Vancouver");

const convertToISO = (timeString) => {
  const date = dayjs(timeString).tz("America/Vancouver").format("ll");
  const time = dayjs(timeString).tz("America/Vancouver").format("HH:mm");
  return { date, time };
};

export default convertToISO;
