import React        from 'react'
import clearDay     from './../assets/display.clear-day.svg'
import clearNight   from './../assets/display.clear-night.svg'
import displaySnow  from './../assets/display.snow.svg'

/**
 * @function displayWeather
 * - Return vector art for corresponding weather types
 * - Weather condition codes can be found at [http://openweathermap.org/weather-conditions]
 * @param {string} icon - The icon code to use as a reference
 */

export default function displayWeather(icon) {
  let iconSrc

  switch(icon) {
    case '13d':
    case '13n':
      iconSrc = displaySnow
      break
    case '01n':
      iconSrc = clearNight
      break
    case '01d':
      iconSrc = clearDay
      break
    default:
      iconSrc = icon[icon.length -1] === 'd' ? clearDay : clearNight
  }

  return <img
    className="content__main__display-bg"
    src={iconSrc}
    alt="Weather"
  />
}