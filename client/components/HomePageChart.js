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
      portfolio: {}
    }
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
    const chartData = histPrices.reduce((accum, val, idx) => {
      accum.push([idx, val.close])
      return accum
    }, [])
    return (
      <div>
        <XYPlot width={500} height={500} getX={d => d[0]} getY={d => d[1]}>
          <LineSeries color="red" data={chartData} />
        </XYPlot>
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
    getStockPrice: () => dispatch(getStockPrice()),
    getPortfolio: () => dispatch(getPortfolio())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePageChart)
)
