import React, {Component} from 'react'
import {connect} from 'react-redux'
import FeaturedChart from './FeaturedChart'
import CompareChart from '../CompareChart'
import CompanyFinancials from '../CompanyFinancials'
import CompanyDetails from './CompanyDetails'
import TickerArea from './TickerArea'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-container">
        {this.props.compare ? <CompareChart /> : <FeaturedChart />}
        <div className="dashboard-spacer" />
        <div className="dashboard-financials-details-container">
          <CompanyFinancials />
          <div className="dashboard-spacer" />
          <CompanyDetails />
        </div>
        <div className="dashboard-spacer" />
        <TickerArea />
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
