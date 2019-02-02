import React, {Component} from 'react'
import {connect} from 'react-redux'
import FeaturedChart from './FeaturedChart'
import CompareChart from '../CompareChart'
import CompanyFinancials from '../CompanyFinancials'
import CompanyDetails from './CompanyDetails'
import Ticker from './Ticker'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-container">
        {this.props.compare ? <CompareChart /> : <FeaturedChart />}
        <div className="dashboard-financials-details-container">
          <CompanyFinancials />
          <CompanyDetails />
        </div>

        <Ticker />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    compare: state.companyDetailsTable.compare
  }
}

export default connect(mapStateToProps)(Dashboard)
