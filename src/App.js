import React, { Component }   from 'react'
import classNames             from 'classnames'
import Header                 from './components/Header'
import { ViewMain, ViewSide } from './components/Views'

import { fetchWeather, weatherIcon } from './utilities'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      daytime:        true,
      forecast_ready: false,
      lastUpdated:    null,
      location:       {
        city:         'London',
        country_code: 'uk',
        country_name: 'United Kingdom',
      },
      tempUnit:        'metric',
      timeSinceUpdate: null,
      updateForecast:  false,
    }
  }

  componentDidMount() {
    const currentDate = Date.now()
    const lastUpdated = localStorage.getItem('lastUpdated')
    const timeToCheck = 10 * 60000  // minutes
    const sinceLastUpdate = currentDate - lastUpdated
    const getNewForecast = sinceLastUpdate > timeToCheck

    this.setState({
      lastUpdated:    new Date(lastUpdated / 1).toString(),
      tempUnit:       localStorage.getItem('settingTempUnit') || 'metric',
      updateForecast: getNewForecast,
    }, () => {

      if (this.state.updateForecast) {
        const locationStr      = `${this.state.location.city},${this.state.location.country_code}`
        const fetchNewWeather  = fetchWeather('weather', locationStr, this.state.tempUnit)
        const fetchNewForecast = fetchWeather('forecast', locationStr, this.state.tempUnit)

        // Make all API Requests and save to state
        Promise.all([fetchNewWeather, fetchNewForecast])
          .then(val => {
            this.setState({
              daytime:        val[0].weather[0].icon.includes('d') ? true : false,
              weather_now:    val[0],
              weather_5day:   val[1],
              updateForecast: false,
              forecast_ready: true,
            })

            this.storeForecast(val)
          })

        return
      }

      const localForecast = JSON.parse(localStorage.getItem('forecast'))
      this.setState({
        daytime:        localForecast[0].weather[0].icon.includes('d') ? true : false,
        weather_now:    localForecast[0],
        weather_5day:   localForecast[1],
        forecast_ready: true,
      })
    })
  }


  storeForecast = data => {
    const lastUpdated = Date.now()
    
    this.setState({ lastUpdated: new Date(lastUpdated).toString(), })
    localStorage.setItem('forecast', JSON.stringify(data))
    localStorage.setItem('lastUpdated', lastUpdated)
    localStorage.setItem('location', `${this.state.location.city},${this.state.location.country_code}`)
  }


  handleTempChange = e => {
    this.setState({ tempUnit: e.target.value })
    localStorage.setItem('settingTempUnit', e.target.value)
  }


  render() {
    const containerClasses = classNames('container', {
      'time-day':   this.state.daytime,
      'time-night': !this.state.daytime,
    })


    if (this.state.forecast_ready) {
      return (
        <div className={containerClasses}>
          <Header
            lastUpdated={this.state.lastUpdated}
            tempUnit={this.state.tempUnit}
            handleTempChange={this.handleTempChange}
          />
          <main className="content">
            <ViewMain
              location={this.state.location}
              weather={this.state.weather_now}
            />
            <ViewSide
              forecast={this.state.weather_5day}
            />
          </main>
        </div>
      )
    }

    return (
      <div className={containerClasses}>
        <div className="loading">
          {weatherIcon('01d', 'clear') }
          <span>Fetching the weather...</span>
        </div>
      </div>
    )
  }
}

export default App
