import React, {Component} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {getNews} from '../store/financialDataTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

class CompanyData extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getNews('KO')
  }

  componentDidUpdate(prevProps) {
    if (this.props.ticker !== prevProps.ticker) {
      this.props.getPortfolioData(this.props.ticker)
      this.props.getNews(this.props.ticker)
    }
  }

  render() {
    const labelsOfFinancialReport = Object.keys(this.props.stats)
    const valuesFromFinancialReport = Object.values(this.props.stats)
    const arrToMapThroughInComponent = [
      [labelsOfFinancialReport],
      [valuesFromFinancialReport]
    ]
    const {news} = this.props
    return (
      <div className="companyFinancials-container">
        <h5>CompanyFinacials Component</h5>
        {this.props.ticker ? (
          <div className="financialList">
            <Table striped>
              <Table.Body>
                {news.map((val, idx) => {
                  console.log('val', val)
                  return (
                    <Table.Row key={idx}>
                      <Table.Cell>{val.source}</Table.Cell>
                      <Table.Cell>{val.headline}</Table.Cell>
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
    ticker: state.chart.ticker,
    news: state.financialDataTable.news
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolioData: ticker => dispatch(getPortfolioData(ticker)),
    getNews: ticker => dispatch(getNews(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
