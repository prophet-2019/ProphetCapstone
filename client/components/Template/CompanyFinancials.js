import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class CompanyFinancials extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="companyFinancials">
        <h4> Company Financials Container </h4>
      </div>
    )
  }
}
