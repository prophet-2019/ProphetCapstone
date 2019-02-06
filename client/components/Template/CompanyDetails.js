import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {getPortfolioData} from '../store/companyDetailsTable'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'
import axios from 'axios'

class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div className="companyDetails-container">
        <h5>Company Details</h5>

        <div className="financialList">
          <Table striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{this.props.stats.companyName}</Table.Cell>
                <Table.Cell>
                  Price ${this.props.stats.marketcap /
                    this.props.stats.sharesOutstanding}
                </Table.Cell>
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
