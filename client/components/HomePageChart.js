import React, {Component} from 'react'
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  FlexibleXYPlot,
  BarSeries,
  XAxis,
  YAxis,
  RectSeries,
  VerticalBarSeries
} from 'react-vis'
import {getStockPrice} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getPortfolio} from '../store/assetallocation'
import AssetAllocation from './AssetAllocation'

// /Users/jaybhagat/Projects/capstone/node_modules/react-vis/dist/style.css
// /Users/jaybhagat/Projects/capstone/client/components/HomePageChart.js

class HomePageChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historicalPrices: [],
      portfolio: [],
      submitEquity: '',
      isLoaded: false,
      timeFrame: 'ytd',
      currentEquity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleChart = this.toggleChart.bind(this)
  }
  handleChange(evt) {
    this.setState({
      submitEquity: evt.target.value,
      currentEquity: evt.target.value
    })
  }
  //just wondering about binding using arrow functions and if this matters
  handleSubmit = () => {
    this.props.getStockPrice(this.state.submitEquity, this.state.timeFrame)
    this.setState({
      submitEquity: '',
      isLoaded: true,
      historicalPrices: this.props.historicalPrices
    })
  }
  toggleChart(time) {
    this.setState({timeFrame: time})
    this.props.getStockPrice(this.state.currentEquity, time)
    this.setState({historicalPrices: this.props.historicalPrices})
  }
  async componentDidMount() {
    await this.props.getStockPrice(
      this.state.currentEquity,
      this.state.timeFrame
    )
    await this.props.getPortfolio()
    this.setState({
      historicalPrices: this.props.historicalPrices,
      portfolio: this.props.portfolio
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.timeFrame !== this.state.timeFrame) {
      this.toggleChart(this.state.timeFrame)
    }
  }
  render() {
    const histPrices = this.state.historicalPrices
    return (
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
        {this.state.isLoaded ? (
          <div>
            <XYPlot width={500} height={500} getX={d => d[0]} getY={d => d[1]}>
              <LineSeries
                color="red"
                data={this.props.historicalPrices}
                dontCheckIfEmpty={true}
              />
            </XYPlot>
            <button
              onClick={() => this.toggleChart('1d')}
              disabled={this.state.timeFrame === '1d'}
            >
              1D
            </button>
            <button
              onClick={() => this.toggleChart('1m')}
              disabled={this.state.timeFrame === '1m'}
            >
              1M
            </button>
            <button
              onClick={() => this.toggleChart('3m')}
              disabled={this.state.timeFrame === '3m'}
            >
              3M
            </button>
            <button
              onClick={() => this.toggleChart('6m')}
              disabled={this.state.timeFrame === '6m'}
            >
              6M
            </button>
            <button
              onClick={() => this.toggleChart('ytd')}
              disabled={this.state.timeFrame === 'ytd'}
            >
              YTD
            </button>
            <button
              onClick={() => this.toggleChart('1y')}
              disabled={this.state.timeFrame === '1y'}
            >
              1Y
            </button>
            <button
              onClick={() => this.toggleChart('2y')}
              disabled={this.state.timeFrame === '2y'}
            >
              2Y
            </button>
            <button
              onClick={() => this.toggleChart('5y')}
              disabled={this.state.timeFrame === '5y'}
            >
              5Y
            </button>
          </div>
        ) : (
          <h1>Type something quickly, please</h1>
        )}

        <AssetAllocation portfolioData={this.state.portfolio} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    portfolio: state.assetallocation.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: (ticker, time) => dispatch(getStockPrice(ticker, time)),
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePageChart)
)
