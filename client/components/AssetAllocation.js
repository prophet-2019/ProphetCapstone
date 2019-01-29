import React, {Component} from 'react'
import {getPortfolio} from '../store/assetallocation'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
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
  constructor(props) {
    super(props)
    this.state = {
      portfolio: {}
    }
  }
  componentDidMount() {
    this.setState({portfolio: this.props.portfolioData})
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.portfolioData !== prevProps.portfolioData) {
      this.setState({
        portfolio: this.props.portfolioData
      })
    }
  }
  render() {
    let myData
    if (this.state.portfolio) {
      console.log('State', this.state)
      const cashCash = this.state.cash || 0
      const portPort = this.state.stocks || 0
      // const cashCash = 2;
      // const portPort = 13;
      myData = Object.values(this.state.portfolio).reduce((accum, val) => {
        accum.push({angle: val})
        return accum
      }, [])
    } else {
      myData = [{angle: 0}, {angle: 0}, {angle: 100}]
    }
    return <RadialChart data={myData} width={300} height={300} />
  }
}

export default AssetAllocation
