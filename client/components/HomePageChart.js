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
      portfolio: {},
      submitEquity: '',
      isLoaded: false,
      timeFrame: 'ytd'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({submitEquity: evt.target.value})
  }
  //just wondering about binding using arrow functions and if this matters
  handleSubmit = () => {
    this.props.getStockPrice(this.state.submitEquity, this.state.timeFrame)
    this.setState({submitEquity: '', isLoaded: true})
  }
  async componentDidMount() {
    await this.props.getStockPrice()
    await this.props.getPortfolio()
    this.setState({
      historicalPrices: this.props.historicalPrices,
      portfolio: this.props.portfolio
    })
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
          <XYPlot width={500} height={500} getX={d => d[0]} getY={d => d[1]}>
            <LineSeries
              color="red"
              data={this.props.historicalPrices}
              dontCheckIfEmpty={true}
            />
          </XYPlot>
        ) : (
          <h1>Type something, please</h1>
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
