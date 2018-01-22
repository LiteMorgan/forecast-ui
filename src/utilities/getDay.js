/**
 * @function getDay
 * - Return the Day value of a date object
 * @param {string} date - A date in YYYY-MM-DD format
 */
 
export default function getDay(date) {

  const newDate = new Date(date)
  const dayVal = newDate.getDay()
  let day

  switch(dayVal) {
    case 0:
      day = 'Sunday'
      break
    case 1:
      day = 'Monday'
      break
    case 2:
      day = 'Tuesday'
      break
    case 3:
      day = 'Wednesday'
      break
    case 4:
      day = 'Thursday'
      break
    case 5:
      day = 'Friday'
      break
    case 6:
      day = 'Saturday'
      break
    default:
      day = dayVal
  }

  return day
}
