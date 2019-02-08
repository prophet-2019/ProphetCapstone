import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {getPortfolioData} from '../store/companyDetailsTable'
import {getStats} from '../../store/financialDataTable'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'
import axios from 'axios'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getStats('KO')
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getStats('KO')
    }
  }

  render() {
    const {company} = this.props
    console.log('compoany', company)
    return (
      <div className="companyDetails-container">
        <h5>{this.props.stats.companyName}</h5>

        <div className="financialList">
          <Table striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Price: ${(
                    this.props.stats.marketcap /
                    this.props.stats.sharesOutstanding
                  ).toFixed(2)}
                </Table.Cell>
                {company.map(val => {
                  return (
                    <Table.Cell key={val[0]}>
                      {val[0]}: {val[1].toFixed(2)}
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    stats: state.companyDetailsTable.stats,
    ticker: state.chart.ticker,
    company: state.financialDataTable.company
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStats: ticker => dispatch(getStats(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyDetails)
)
