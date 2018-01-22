/**
 * @function getHour
 * - Return the Hour value of a date object
 * @param {string} date - A date in yyyy-MM-dd HH:mm:ss format
 * @param {string} [format=24] - The date format to return the value in
 */
 
export default function getHour(date, format = 24) {
  const time = date.split(' ')
  const hour = time[1].split(':')

  const str = `${hour[0]}00`
  return str
}