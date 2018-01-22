import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import { getDay, weatherIcon } from './../../utilities'

import './style.css'


export default class Forecast extends Component {
  
  render() {
    const {
      date,
      dateFormat, // Day/Time
      icon,
      temp,
      weather,
    } = this.props

    let dt
    if (dateFormat === 'day') {
      dt = <span className="forecast__time">
        <strong>{getDay(date)}</strong>
      </span>
    }
    if (dateFormat === 'time') {
      const hour = date.slice(0,2)
      const time = date.slice(2)
      dt = <span className="forecast__time">
        <strong>{hour}</strong>{time}
      </span>
    }

    return(
      <div className="forecast">
        {dt}
        <span className="forecast__icon">
          {weatherIcon(icon, weather) }
        </span>
        <span className="forecast__temp">
          {Math.round(temp)}&deg;
        </span>
      </div>
    )
  }
}

Forecast.propTypes = {
  date:       PropTypes.string,
  dateFormat: PropTypes.string,
  icon:       PropTypes.string,
  temp:       PropTypes.number,
  weather:    PropTypes.string,
}
