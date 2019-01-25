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

class HomePageChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historicalPrices: []
    }
  }
  async componentDidMount() {
    await this.props.getStockPrice()
    this.setState({historicalPrices: this.props.historicalPrices})
  }
  render() {
    const histPrices = this.state.historicalPrices
    const chartData = histPrices.reduce((accum, val, idx) => {
      accum.push([idx, val.close])
      return accum
    }, [])
    console.log('chartData', chartData)
    return (
      <XYPlot width={500} height={500} getX={d => d[0]} getY={d => d[1]}>
        <LineSeries color="red" data={chartData} />
      </XYPlot>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: () => dispatch(getStockPrice())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePageChart)
)
