import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class CompanyPrices extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="companyPrices">
        <h4> Company Prices Component </h4>
        <h5>{this.props.stats.companyName}</h5>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats
  }
}

export default withRouter(connect(mapStateToProps)(CompanyPrices))
