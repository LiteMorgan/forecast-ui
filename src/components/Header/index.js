import React, { Component } from 'react'
import classNames           from 'classnames'
import PropTypes            from 'prop-types'

import baseIcons from './../../assets/icons.base.svg'

import './style.css'

export default class Header extends Component {
  /**
   * @function constructor
   */
  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false,
    }
  }

  handleMenuClick = () => this.setState({ menuOpen: !this.state.menuOpen })
  
  handleOverlayClick = () => this.setState({ menuOpen: false })

  /**
   * @function render
   */
  render() {
    const { lastUpdated } = this.props

    const lastUpdatedTime = () => {
      const date    = new Date(lastUpdated)
      const hours   = date.getHours()
      const minutes = date.getMinutes()

      return `${hours}:${minutes}`
    }

    const headerClasses = classNames('header', {
      'nav-open': this.state.menuOpen,
    })
    const tempUnitMetric = classNames('nav__radio__item', {
      'nav__radio__item--active': this.props.tempUnit === 'metric',
    })
    const tempUnitImperial = classNames('nav__radio__item', {
      'nav__radio__item--active': this.props.tempUnit === 'imperial',
    })
    const tempUnitDefault = classNames('nav__radio__item', {
      'nav__radio__item--active': this.props.tempUnit === 'default',
    })

    return(
      <header className={headerClasses}>
        <div className="header__content">
          <svg
            role="img"
            aria-label="Settings"
            className="nav__button"
            onClick={this.handleMenuClick}
          >
            <use xlinkHref={`${baseIcons}#icon__settings`} />
          </svg>
        </div>
        <nav className="nav">
          <section className="nav__section">
            <h4>Settings</h4>
            <span className="nav__heading">Temperature units</span>
            <span className="nav__desc">Set the unit to display. This will take up to 10 minutes to update.</span>
            <span className="nav__radio">
              <span className={tempUnitMetric}>
                <input
                  className="nav__radio__input"
                  type="radio"
                  id="temp-celsius"
                  name="temp-unit"
                  value="metric"
                  onChange={this.props.handleTempChange}
                  checked={this.props.tempUnit === 'metric'}
                />
                <label htmlFor="temp-celsius">&deg;C</label>
              </span>

              <span className={tempUnitImperial}>
                <input
                  className="nav__radio__input"
                  type="radio"
                  id="temp-fahrenheit"
                  name="temp-unit"
                  value="imperial"
                  onChange={this.props.handleTempChange}
                  checked={this.props.tempUnit === 'imperial'}
                />
                <label htmlFor="temp-fahrenheit">&deg;F</label>
              </span>

              <span className={tempUnitDefault}>
                <input
                  className="nav__radio__input"
                  type="radio"
                  id="temp-kelvin"
                  name="temp-unit"
                  value="default"
                  onChange={this.props.handleTempChange}
                  checked={this.props.tempUnit === 'default'}
                />
                <label htmlFor="temp-kelvin">&deg;K</label>
              </span>
            </span>
            <hr />
          </section>
          <small>Last updated at {lastUpdatedTime()}</small>
        </nav>
        <div
          className="nav__overlay"
          onClick={this.handleOverlayClick}
        />
      </header>
    )
  }
}

Header.propTypes = {
  handleTempChange: PropTypes.func,
  lastUpdated:      PropTypes.string,
  tempUnit:         PropTypes.string,
}
