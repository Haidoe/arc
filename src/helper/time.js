import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export const getCurrentDate = (datetime) => {
  return dayjs(datetime).tz("America/Vancouver").format("YYYY-MM-DD");
};

export const datetimeToTime = (datetime) => {
  return dayjs(datetime).tz("America/Vancouver").format("HH:mm");
};

export const timeToDatetime = (time) => {
  const currentDate = getCurrentDate(new Date());
  return dayjs(`${currentDate}T${time}`).toISOString();
};
