import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import FeaturedChart from './FeaturedChart'
import CompanyFinancials from './CompanyFinancials'
import CompanyDetails from './CompanyDetails'
import Ticker from './Ticker'
import Selector from './Selector'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-container">
        {/* <h4> Dashboard Container </h4> */}
        <div>
          <div className="dashboard-feature">
            <FeaturedChart />
          </div>
          <div className="dashboard-financials-details">
            <div className="financials">
              <CompanyFinancials />
            </div>
            <div className="details">
              <CompanyDetails />
            </div>
          </div>
        </div>
        <div className="ticker">
          <Ticker />
        </div>
      </div>
    )
  }
}
