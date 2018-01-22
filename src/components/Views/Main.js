import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import Location    from './../Location'
import LiveWeather from './../LiveWeather'

import { displayWeather } from './../../utilities'

import './style.css'

export default class Main extends Component {
  /**
   * @function render
   */
  render() {
    const { location, weather } = this.props

    const forecastWeather = {
      condition: weather.weather[0].main,
      temp:      weather.main.temp,
      tempMax:   weather.main.temp_max,
      tempMin:   weather.main.temp_min,
    }

    const forecastStats = {
      cloudiness: weather.clouds.all,
      humidity:   weather.main.humidity,
      pressure:   weather.main.pressure,
      rainLevel:  weather.rain ? weather.rain[0] : 0,
      snowLevel:  weather.snow ? weather.snow[0] : null,
      sunrise:    new Date(weather.sys.sunrise * 1000),
      sunset:     new Date(weather.sys.sunset * 1000),
      windDir:    weather.wind.deg,
      windSpeed:  weather.wind.speed,
    }

    return(
      <section className="content__main">
        {displayWeather(weather.weather[0].icon)}
        <Location
          city={location.city}
          country={location.country_name}
        />
        <LiveWeather
          weather={forecastWeather} 
          stats={forecastStats}
        />
      </section>
    )
  }
}

Main.propTypes = {
  location: PropTypes.object,
  weather:  PropTypes.object,
}