import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class CompanyPrices extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="companyPrices">
        <h4> Company Prices Container </h4>
      </div>
    )
  }
}
