import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getStockPrice} from '../../store/chart'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitEquity: '',
      currentEquity: '',
      submitEquity2: '',
      currentEquity2: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
  }

  handleChange(evt) {
    this.setState({
      submitEquity: evt.target.value,
      currentEquity: evt.target.value
    })
  }
  handleChange2(evt) {
    this.setState({
      submitEquity2: evt.target.value,
      currentEquity2: evt.target.value
    })
  }

  handleSubmit = async () => {
    await this.props.getStockPrice(this.state.submitEquity, 'ytd')
    await this.setState({
      submitEquity: ''
    })
  }
  handleSubmit2 = async () => {
    await this.props.getStockPrice(
      this.state.submitEquity2,
      'ytd',
      this.props.ticker
    )
    await this.setState({
      submitEquity2: ''
    })
  }

  async componentDidMount() {
    await this.props.getStockPrice(this.state.currentEquity, 'ytd')
  }

  render() {
    return (
      <div className="search">
        <div>
          <label>
            Pick an equity:
            <input
              type="text"
              value={this.state.submitEquity}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
        {this.props.compare ? (
          <div>
            <label>
              Pick another equity:
              <input
                type="text"
                value={this.state.submitEquity2}
                onChange={this.handleChange2}
              />
            </label>
            <input type="submit" value="Submit" onClick={this.handleSubmit2} />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    ticker: state.chart.ticker,
    compare: state.companyDetailsTable.compare,
    ticker2: state.chart.ticker2
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: (ticker, time, ticker2) =>
      dispatch(getStockPrice(ticker, time, ticker2))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
