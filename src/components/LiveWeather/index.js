import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import WeatherStat from './../WeatherStat'

import './style.css'


export default class LiveWeather extends Component {

  render() {
    const { weather, stats } = this.props

    const weatherStatSnow = <WeatherStat
      name="Snow level"
      icon="snowlevel"
      result={stats.snowLevel}
      notation="cm"
    />

    // Hide `Snow level` if 0
    const SnowLevel = stats.snowLevel ? weatherStatSnow : null

    return(
      <div>
        <section className="forecast__now">
          <div className="live__temp">
            {Math.round(weather.temp)}&deg;
          </div>
          <div className="live__details">
            <span className="live__condition">{weather.condition}</span>
            <div className="live__minmax">
              <span>{weather.tempMin}&deg;</span> / <span>{weather.tempMax}&deg;</span>
            </div>
          </div>
        </section>

        <section className="forecast__stats">
          <WeatherStat
            name="Sunrise"
            icon="sunrise"
            result={stats.sunrise.toLocaleTimeString()}
          />
          <WeatherStat
            name="Sunset"
            icon="sunset"
            result={stats.sunset.toLocaleTimeString()}
          />
          <WeatherStat
            name="Wind speed"
            icon="windspeed"
            result={stats.windSpeed}
            notation="mph"
          />
          <WeatherStat
            name="Cloudiness"
            icon="cloudiness"
            result={stats.cloudiness}
            notation="%"
          />
          <WeatherStat
            name="Humidity"
            icon="humidity"
            result={stats.humidity}
            notation="%"
          />
          <WeatherStat
            name="Pressure"
            icon="pressure"
            result={stats.pressure}
            notation=" hPa"
          />
          <WeatherStat
            name="Rain level"
            icon="rainlevel"
            result={stats.rainLevel}
            notation="cm"
          />
          {SnowLevel}
        </section>
      </div>
    )
  }
}

LiveWeather.propTypes = {
  stats:   PropTypes.object,
  weather: PropTypes.object,
}
