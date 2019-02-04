import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import BuySellPage from '../BuySellPage'

class CompanyPrices extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="companyPrices">
        <h4> Buy and Sell Stocks Here </h4>
        <BuySellPage ticker={this.props.ticker} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats,
    ticker: state.chart.ticker
  }
}

export default withRouter(connect(mapStateToProps)(CompanyPrices))
