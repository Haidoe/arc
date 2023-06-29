// this function returns the timestamp (in seconds) of today at 00:00:00
export const getTodayTimestamp = () => {
    const today = new Date();
    const todayTimestamp = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ).getTime();
    return todayTimestamp / 1000;
}

// export it now
export default getTodayTimestamp;