import React, { Component }       from 'react'
import classNames                 from 'classnames'
import PropTypes                  from 'prop-types'
import { Forecast, ForecastMini } from './../Forecast'

import { getHour } from './../../utilities'

import './style.css'


export default class Card extends Component {

  handleClick = e => {
    // Stop clicks from firing when Card is active
    if (this.props.active) { return }

    this.props.handleClick(e)
  }


  render() {
    const {
      active,
      array,
      average,
      date
    } = this.props

    // Add an extra spacer to keep other ForecastMini
    // elements closely aligned
    let buffer
    if (array.length < 8) {
      buffer = <span className="card__buffer"></span>
    }

    const cardClasses = classNames('card', {
      'open': active,
    })

    return(
      <article
        id={date}
        className={cardClasses}
        onClick={this.handleClick}
      >
        <Forecast
          date={date}
          dateFormat='day'
          icon={average.weather[0].icon}
          temp={average.main.temp}
          weather={average.weather[0].description}
        />
        <div className="card__row">
          {array.map(hour => {
            return <ForecastMini
              key={hour.dt}
              icon={hour.weather[0].icon}
              temp={hour.main.temp}
              time={getHour(hour.dt_txt)}
              weather={hour.weather[0].main}
            />
          })}
          {buffer}
        </div>
      </article>
    )
  }
}

Card.propTypes = {
  active:      PropTypes.bool,
  array:       PropTypes.array,
  average:     PropTypes.object,
  date:        PropTypes.string,
  handleClick: PropTypes.func,
}
