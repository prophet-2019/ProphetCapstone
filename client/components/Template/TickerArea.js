import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Ticker from '../Ticker'

export default class TickerArea extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="tickerDiv">
        <Ticker />
      </div>
    )
  }
}
