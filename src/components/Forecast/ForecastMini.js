import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import { weatherIcon } from './../../utilities'

import './style.css'

export default class ForecastMini extends Component {

  render() {

    const {
      icon,
      temp,
      time,
      weather,
    } = this.props

    const hour       = time.slice(0,2)
    const hourFormat = time.slice(2)

    return(
      <div className="forecast forecast--mini">
        <span className="forecast__time">
          <strong>{hour}</strong>{hourFormat}
        </span>
        <span className="forecast__icon">
          {weatherIcon(icon, weather)}
        </span>
        <span className="forecast__temp">
          {Math.round(temp)}&deg;
        </span>
      </div>
    )
  }
}

ForecastMini.propTypes = {
  icon:    PropTypes.string,
  temp:    PropTypes.number,
  time:    PropTypes.string,
  weather: PropTypes.string,
}
