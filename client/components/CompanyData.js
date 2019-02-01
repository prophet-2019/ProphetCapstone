import React, {Component} from 'react'
import {getFinancialData} from '../store/financialDataTable'
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
    await this.props.getFinancialData('aapl')
    this.setState({financials: this.props.financials})
  }

  render() {
    const labelsOfFinancialReport = Object.keys(this.state.financials)
    const valuesFromFinancialReport = Object.values(this.state.financials)
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
    financials: state.financialDataTable.financials
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFinancialData: ticker => dispatch(getFinancialData(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
