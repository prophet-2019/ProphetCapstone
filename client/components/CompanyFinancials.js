import React, {Component} from 'react'
import {getPortfolioData} from '../store/companyDetailsTable'
import {getNews} from '../store/financialDataTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Table} from 'semantic-ui-react'

class CompanyData extends Component {
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
    const {news} = this.props
    return (
      <div className="companyFinancials-container">
        <h5>News</h5>
        {this.props.ticker ? (
          <div className="financialList">
            <Table striped>
              <Table.Body>
                {news.map((val, idx) => {
                  return (
                    <Table.Row key={`${val.source} - ${idx}`}>
                      <Table.Cell>{val.source}</Table.Cell>
                      <Table.Cell>
                        <a
                          href={val.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {val.headline}
                        </a>
                      </Table.Cell>
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
