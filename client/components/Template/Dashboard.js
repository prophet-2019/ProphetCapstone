import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import FeaturedChart from './FeaturedChart'
import CompanyFinancials from './CompanyFinancials'
import CompanyDetails from './CompanyDetails'
import Ticker from './Ticker'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-container">
        <FeaturedChart />

        <div className="dashboard-financials-details-container">
          <CompanyFinancials />
          <CompanyDetails />
        </div>

        <Ticker />
      </div>
    )
  }
}
