import React, {Component} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

class CompanyData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dispatchedObj: {},
      ticker: ''
    }
  }

  componentDidMount() {
    const dispatchedObj = this.props.getPortfolioData(this.props.ticker)
    this.setState({dispatchedObj, ticker: this.props.ticker})
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
