import React, {Component} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class CompanyData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      financials: {}
    }
  }
  async componentDidMount() {
    console.log('DID MOUNT TICKERRR ---- ', this.props.ticker)
    await this.props.ticker
    await this.props.getPortfolioData(this.props.ticker)
  }

  componentDidUpdate() {
    console.log('DID UPDATE TICKERRR ---- ', this.props.ticker)
  }

  render() {
    const labelsOfFinancialReport = Object.keys(this.props.stats)
    const valuesFromFinancialReport = Object.values(this.props.stats)
    const arrToMapThroughInComponent = [
      [labelsOfFinancialReport],
      [valuesFromFinancialReport]
    ]
    return (
      <div>
        <h5>Data From Most Recent Financial Report</h5>
        <div className="financialList">
          <table>
            {this.props.ticker ? (
              <tbody>
                {labelsOfFinancialReport.map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{labelsOfFinancialReport[idx]}</td>
                      <td>{valuesFromFinancialReport[idx]}</td>
                    </tr>
                  )
                })}
              </tbody>
            ) : null}
          </table>
        </div>
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
