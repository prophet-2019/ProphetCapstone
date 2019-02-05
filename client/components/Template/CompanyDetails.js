import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Ticker from '../Ticker'

export default class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="details">
        <h5>Company Details</h5>
      </div>
    )
  }
}
