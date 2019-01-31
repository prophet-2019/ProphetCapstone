import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class Ticker extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ticker">
        <h4> Ticker Container </h4>
      </div>
    )
  }
}
