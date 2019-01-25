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
  VerticalBarSeries,
  RadialChart
} from 'react-vis'

class AssetAllocation extends Component {
  render() {
    const myData = [{angle: 1}, {angle: 5}, {angle: 2}]
    return <RadialChart data={myData} width={300} height={300} />
  }
}

export default AssetAllocation
