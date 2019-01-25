import React, {Component} from 'react'
import {getFinancials} from '../store/chart'
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
    await this.props.getFinancials()
    this.setState({financials: this.props.financials})
  }

  render() {
    const financials = this.state.financials.financials || []
    console.log('DATA STATE', financials)
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>{this.state.financials.symbol}</th>
            </tr>
            <tbody>
              {financials.map((val, idx) => {
                console.log('val', val)
                return (
                  <tr key={idx}>
                    <td>{val.reportDate}</td>
                    <td>{val.grossProfit}</td>
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
    financials: state.chart.financials
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFinancials: () => dispatch(getFinancials())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
