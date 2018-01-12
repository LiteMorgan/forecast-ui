import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import Search from './components/Search'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      city:           null,
      countryCode:    null,
      forecast:       null,
      lastUpdated:    null,
      updateForecast: false,
    }
  }

  componentDidMount() {
    // - On app start, request location (or use current, if I can?)
    // - Save to local storage
    // - Check if any weather data has been pulled recently
    //   - Check if local storage contains saved weather data
    //   - Compare new date to a date in local storage to see if 10 minutes have passed

    const currentDate = Date.now()
    const lastUpdated = localStorage.getItem('lastUpdated')
    const timeToCheck = 10 * 60000  // minutes
    const sinceLastUpdate = currentDate - lastUpdated
    const getNewForecast = sinceLastUpdate > timeToCheck
    console.log(sinceLastUpdate, timeToCheck, getNewForecast)

    this.setState({
      lastUpdated: new Date(lastUpdated / 1).toString(),
      updateForecast: getNewForecast
    }, () => {
      fetch('https://freegeoip.net/json/')
        .then(res => res.json())
        .then(res => {
          this.checkLocation(res)
        })
    })
  }


  checkLocation = location => {
    const city            = location.city
    const countryCode     = location.country_code.toLowerCase()
    const currentLocation = `${city},${countryCode}`
    const lastLocation    = localStorage.getItem('location')

    this.setState({ city, countryCode }, () => {
      if (currentLocation !== lastLocation) {
        console.log('different location!')
        this.fetchForecast()
        return
      } 

      console.log('same location!')
      if (this.state.updateForecast) {
        this.fetchForecast()
        return
      }
      
      this.setState({ forecast: JSON.parse(localStorage.getItem('forecast')) })
    })
  }


  fetchForecast = () => {
    const apiKey   = '&appid=a72cb96622b9bb789425193273dd2361'
    const location = `q=${this.state.city},${this.state.countryCode}`
    const units    = '&units=metric'

    fetch(`https://api.openweathermap.org/data/2.5/forecast?${location}${units}${apiKey}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          forecast:       res,
          updateForecast: false,
        })
        this.storeForecast(res)
      })
  }


  storeForecast = data => {
    const lastUpdated = Date.now()

    this.setState({ lastUpdated: new Date(Date.now()).toString(), })

    localStorage.setItem('forecast', JSON.stringify(data))
    localStorage.setItem('lastUpdated', lastUpdated)
    localStorage.setItem('location', `${this.state.city},${this.state.countryCode}`)
    console.log(`Forecast updated! Now showing the weather for ${this.state.city}`)
  }



  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <p>
          Current location: <code>{this.state.city}</code>
        </p>
        <p>
          Last updated: <code>{this.state.lastUpdated}</code>
        </p>
      </div>
    );
  }
}

export default App;
