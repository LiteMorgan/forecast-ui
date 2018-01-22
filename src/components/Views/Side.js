import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import Card                 from './../Card'
import { Forecast }         from './../Forecast'

import { getHour } from './../../utilities'

import './style.css'

export default class Side extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dateToday:        null,
      forecastDaily:    {},
      forecastHourly:   [],
      openCard:         '',
    }
  }

  /**
   * @function componentDidMount
   */
  componentDidMount() {
    const dateToday      = new Date().toISOString().slice(0,10)
    const forecastList   = this.props.forecast['list']
    const forecastHourly = forecastList.slice(0,8)
    const forecastDaily  = forecastList.reduce((groups, item) => {
      const val = item['dt_txt']
      const getDate = val.split(' ', 1).toString()

      groups[getDate] = groups[getDate] || []
      groups[getDate].push(item)

      return groups
    }, {})
    delete forecastDaily[dateToday]

    this.setState({
      dateToday:        dateToday,
      forecastDaily:    forecastDaily,
      forecastHourly:   forecastHourly,
      openCard:         Object.keys(forecastDaily)[0],
    })
  }


  /**
   * @function handleCardClick
   */
  handleCardClick = e => this.setState({ openCard: e.target.id })


  /**
   * @function render
   */
  render() {
    const forecastList = this.props.forecast['list']

    // Create a list of expected, average weathers by using the weather report 
    // for 12pm on upcoming days.
    // - 5 results are expected
    const forecastDailyAvg = forecastList.filter(item => {
      if (item.dt_txt.includes(this.state.dateToday)) { return null }
      return item.dt_txt.includes('12:00:00')  
    })
    // If 12pm missing for final day, use first available entry from the end 
    // of source array.
    // - This will only happen if array length < 5
    if (forecastDailyAvg.length < 5) {
      forecastDailyAvg.push(forecastList[forecastList.length - 1])
    }

    return(
      <section className="content__side">
        <div className="content__side__panel">
          <h3>Daily forecast</h3>
          {this.state.forecastHourly.map(item => {
            return <Forecast
              key={item.dt_txt}
              date={getHour(item.dt_txt)}
              dateFormat='time'
              icon={item.weather[0].icon}
              temp={item.main.temp}
              weather={item.weather[0].description}
            />
          })}
        </div>
        <div className="content__side__panel content__side__panel--days">
          <h3>5-day forecast</h3>
          {Object.keys(this.state.forecastDaily).map(date => {
            const avg = forecastDailyAvg.find(item => item.dt_txt.includes(date))

            return <Card
              key={date}
              active={this.state.openCard === date ? true: false}
              array={this.state.forecastDaily[date]}
              average={avg}
              date={date}
              handleClick={this.handleCardClick}
            />
          })}
        </div>
      </section>
    )
  }
}

Side.propTypes = {
  forecast: PropTypes.object,
}
