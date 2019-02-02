import React, {Component} from 'react'
import {XYPlot, LineSeries} from 'react-vis'
import {getStockPrice} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

class HomePageChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeFrame: 'ytd'
    }
    this.toggleChart = this.toggleChart.bind(this)
  }

  toggleChart(time) {
    this.setState({timeFrame: time})
    this.props.getStockPrice(this.props.ticker, time)
  }

  async componentDidMount() {
    await this.props.getStockPrice(
      this.state.currentEquity,
      this.state.timeFrame
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timeFrame !== this.state.timeFrame) {
      this.toggleChart(this.state.timeFrame)
    }
  }
  render() {
    const histPrices = this.props.historicalPrices
    return (
      <div>
        {histPrices.length > 0 ? (
          <div>
            <XYPlot width={900} height={300} getX={d => d[0]} getY={d => d[1]}>
              <LineSeries
                animation
                color="red"
                data={histPrices}
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
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    ticker: state.chart.ticker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStockPrice: (ticker, time) => dispatch(getStockPrice(ticker, time))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePageChart)
)
