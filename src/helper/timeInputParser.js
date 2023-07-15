// timeString to ISO 8601 time format
function timeStringToISO(timeString) {
  if (timeString === "") return "";
  // Create a new Date object and set the time
  const date = new Date();
  date.setHours(Number(timeString.substr(0, 2)));
  date.setMinutes(Number(timeString.substr(3, 2)));
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Convert the date to UTC format
  const utcDateString = date.toISOString();

  console.log(utcDateString)
  return utcDateString;
}

// ISO 8601 time format to timeString
function ISOToTimeString(utcDateString) {

  if (utcDateString === "") return "";
  // Create a new Date object from the UTC date string
  const date = new Date(utcDateString);

  // Convert to local time in Vancouver timezone
  const vancouverTimeString = date.toLocaleString("en-US", {
    timeZone: "America/Vancouver",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return hoursMinutesFormat(vancouverTimeString);

}

function hoursMinutesFormat(timeString) {
  const timeParts = timeString.split(':');
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1].split(' ')[0], 10);

  if (timeString.includes('PM') && hours !== 12) {
    hours += 12;
  } else if (timeString.includes('AM') && hours === 12) {
    hours = 0;
  }

  const hours24Format = hours.toString().padStart(2, '0');
  const hoursMinutesFormat = `${hours24Format}:${minutes.toString().padStart(2, '0')}`;

  console.log(hoursMinutesFormat);
  return hoursMinutesFormat;
}



export { timeStringToISO, ISOToTimeString };
