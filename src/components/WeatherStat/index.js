import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import baseIcons from './../../assets/icons.base.svg'

import './style.css'

export default class WeatherStat extends Component {
  
  render() {
    const {
      icon,
      name,
      result,
      notation,
    } = this.props

    return(
      <div className="weather-stat">
        <span className="weather-stat__title">
          <svg
            role="img"
            aria-label={name}
          >
            <use xlinkHref={`${baseIcons}#icon__${icon}`} />
          </svg>
          {name}
        </span>
        <span>
          <strong>{result}{notation}</strong>
        </span>
      </div>
    )
  }
}

WeatherStat.propTypes = {
  icon:     PropTypes.string,
  name:     PropTypes.string,
  notation: PropTypes.string,
  result:   PropTypes.node,
}
