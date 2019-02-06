import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPortfolioData} from '../store/companyDetailsTable'
import {withRouter} from 'react-router'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getPortfolioData(this.props.ticker)
    }
  }

  render() {
    const labelsOfFinancialReport = Object.keys(this.props.stats)
    const valuesFromFinancialReport = Object.values(this.props.stats)
    const arrToMapThroughInComponent = [
      [labelsOfFinancialReport],
      [valuesFromFinancialReport]
    ]
    return (
      <div className="companyDetails-container">
        <h5>Company Prices</h5>
        {this.props.ticker ? (
          <div className="financialList">
            <Table striped>
              <Table.Body>
                {labelsOfFinancialReport.map((val, idx) => {
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell>{labelsOfFinancialReport[idx]}</Table.Cell>
                      <Table.Cell>{valuesFromFinancialReport[idx]}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </div>
        ) : null}
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

const mapDispatchToProps = dispatch => {
  return {
    getPortfolioData: ticker => dispatch(getPortfolioData(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
)
