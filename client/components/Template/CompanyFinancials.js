import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class CompanyFinancials extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="financials">
        <h4> Company Financials Component </h4>
      </div>
    )
  }
}
