import React, {Component} from 'react'
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  YAxis
} from 'react-vis'
import {getStockPrice} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class HomePageChart extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await this.props.getStockPrice()
  }
  render() {
    console.log('PROPS', this.props)
    return (
      <XYPlot width={300} height={300} getX={d => d[0]} getY={d => d[1]}>
        <LineSeries color="red" data={[[1, 0], [2, 1], [3, 2]]} />
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
