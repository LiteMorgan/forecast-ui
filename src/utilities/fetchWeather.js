/**
 * @function fetchWeather
 * - Runs a fetch request to the OpenWeatherMap API
 * @param {string} type - The type of weather data to return, e.g. 'weather', 'forecast'
 * @param {string} location - The location to fetch data for. Can be changed in App.js
 * @param {string} unit - The type of unit to request. Default can be changed in App.js, but will override through UI/localStorage
 */

export default function fetchWeather(type, location, unit) {

  const apiKey      = '&appid=a72cb96622b9bb789425193273dd2361'
  const locationKey = `q=${location}`
  const unitsKey    = `&units=${unit}`

  return fetch(`https://api.openweathermap.org/data/2.5/${type}?${locationKey}${unitsKey}${apiKey}`)
    .then(res => res.json())
    .then(res => { return res })
}
