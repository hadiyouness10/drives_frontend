export default function dateTimeFormatter(date, mode) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]
    if (mode === 'date') return days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate()
    else return (date.getHours() % 12 === 0 ? 12 : date.getHours() % 12) + (date.getMinutes() < 10 ? ":0" : ":") + date.getMinutes() + " " + (date.getHours() < 12 ? "AM" : "PM")
}