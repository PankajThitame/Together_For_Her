import { DateTime } from "luxon";

/**
 * Formats a date response from Spring Boot (often a LocalDateTime array or ISO string)
 * @param {Array|String} dateInput 
 * @returns {String} Formatted date string
 */
export const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";

    try {
        let dateTime;
        if (Array.isArray(dateInput)) {
            // Handles [year, month, day, hour, minute, second, nanoseconds]
            dateTime = DateTime.fromObject({
                year: dateInput[0],
                month: dateInput[1],
                day: dateInput[2],
                hour: dateInput[3] || 0,
                minute: dateInput[4] || 0,
                second: dateInput[5] || 0,
                millisecond: dateInput[6] ? Math.floor(dateInput[6] / 1000000) : 0,
            });
        } else {
            dateTime = DateTime.fromISO(dateInput);
        }

        return dateTime.isValid ? dateTime.toFormat("dd MMM yyyy, hh:mm a") : "Invalid Date";
    } catch (error) {
        console.error("Date formatting error:", error);
        return "Invalid Date";
    }
};
