import React, {Component} from 'react'
import {getFinancialData, getNews} from '../store/financialDataTable'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

//CompanyFinancials is the page where this is actually running. This component is deprecated. Delete upon testing, refactoring session.

class CompanyData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      financials: {}
    }
  }
  async componentDidMount() {
    await this.props.getFinancialData('aapl')
    this.props.getNews('KO')
    this.setState({financials: this.props.financials})
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
      <div>
        <table>
          <thead>
            <tr>
              <th>{this.props.ticker} News</th>
            </tr>
            <tbody>
              {news.map((val, idx) => {
                return (
                  <tr key={`${val.source} - ${idx}`}>
                    <td>{val.source}</td>
                    <td>{val.headline}</td>
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
    financials: state.financialDataTable.financials,
    news: state.financialDataTable.news,
    ticker: state.chart.ticker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFinancialData: ticker => dispatch(getFinancialData(ticker)),
    getNews: ticker => dispatch(getNews(ticker))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyData)
)
