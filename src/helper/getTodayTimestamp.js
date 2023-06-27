// this function returns the timestamp of today at 00:00:00
export const getTodayTimestamp = () => {
    const today = new Date();
    const todayTimestamp = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ).getTime();
    console.log(todayTimestamp)
    return todayTimestamp;
}

// export it now
export default getTodayTimestamp;