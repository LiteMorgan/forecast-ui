import React        from 'react'
import weathericons from './../assets/icons.weather.svg'

/**
 * @function getHour
 * - Return SVG weather icon for corresponding weather types
 * - Weather condition codes can be found at [http://openweathermap.org/weather-conditions]
 * @param {string} id - The icon code to use as a reference
 * @param {string} desc - A description to use in the aria-label
 */

export default function weatherIcon(id, desc) {

  let iconName
  switch (id) {
    case "01d":
      iconName = 'clear-day'
      break

    case "01n":
      iconName = 'clear-night'
      break

    case "02d":
    case "03d":
      iconName = 'cloudy-day'
      break

    case "02n":
    case "03n":
      iconName = 'cloudy-night'
      break

    case "04d":
    case "04n":
      iconName = 'overcast'
      break

    case "":
      iconName = 'windy'
      break

    case "10d":
    case "10n":
      iconName = 'light-rain'
      break

    case "09d":
    case "09n":
      iconName = 'rain'
      break

    case "11d":
    case "11n":
      iconName = 'thunder'
      break

    case "13d":
    case "13n":
      iconName = 'snow'
      break

    default:
      iconName = 'clear-day'
  }

  return (
    <svg
      role="img"
      aria-label={desc}
    >
      <use xlinkHref={`${weathericons}#weather__${iconName}`} />
    </svg>
  )
}