import React     from 'react'
import PropTypes from 'prop-types'

//import CityList from './../../data/city.list.json'


export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value:     '',
      autofill:  false,
      isActive:  false,
      isFocused: false,
    }
  }

  onChange = evt => {
    const value = evt.target.value
    this.setState({ value })
  }

  render() {

    return (
      <div>
        <label>{this.props.label}</label>
        <input
          onChange={this.onChange}
        />
      </div>
    )
  }
}

Search.propTypes = {

}