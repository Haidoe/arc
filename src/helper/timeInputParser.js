// timeString to ISO 8601 time format
function timeStringToISO(timeString) {
  // Create a new Date object and set the time
  const date = new Date();
  date.setHours(Number(timeString.substr(0, 2)));
  date.setMinutes(Number(timeString.substr(3, 2)));
  date.setSeconds(0);
  date.setMilliseconds(0);

  // Convert the date to UTC format
  const utcDateString = date.toISOString();
  return utcDateString;
}

// ISO 8601 time format to timeString
function ISOToTimeString(utcDateString) {

  // Create a new Date object from the UTC date string
  const date = new Date(utcDateString);

  // Get the hours and minutes from the Date object
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Create the time string in the desired format
  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return timeString;
}

export { timeStringToISO, ISOToTimeString };
