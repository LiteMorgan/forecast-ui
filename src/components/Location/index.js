import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import './style.css'

export default class Location extends Component {

  render() {
    const { city, country } = this.props

    return(
      <div className="location">
        <h1 className="heading">
          { city },
          <span>{ country }</span>
        </h1>
      </div>
    )
  }
}

Location.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
}
