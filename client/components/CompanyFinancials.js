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
    await this.props.getPortfolioData('aapl')
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
        <table>
          <thead>
            <tr>
              <th>Data From Most Recent Financial Report</th>
            </tr>
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
          </thead>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats
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
