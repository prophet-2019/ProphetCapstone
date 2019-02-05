import React, {Component} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

class CompanyData extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    this.props.getPortfolioData(this.props.ticker)
    const labelsOfFinancialReport = Object.keys(this.props.stats)
    const valuesFromFinancialReport = Object.values(this.props.stats)
    const arrToMapThroughInComponent = [
      [labelsOfFinancialReport],
      [valuesFromFinancialReport]
    ]
    return (
      <div className="companyFinancials-container">
        <h5>Data From Most Recent Financial Report</h5>
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
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
