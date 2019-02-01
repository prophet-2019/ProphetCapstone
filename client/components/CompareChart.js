import React, {Component} from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  DiscreteColorLegend,
  VerticalGridLines,
  LineMarkSeries
} from 'react-vis'
import {getPortfolio} from '../store/assetallocation'
import {getComparedStockPrice} from '../store/compareChart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const axisProps = {
  tickSizeInner: 0,
  style: {line: {stroke: '#939393', strokeWidth: '1px'}}
}

class CompareChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolio: {},
      submitEquityCo1: '',
      currentEquityCo1: '',
      submitEquityCo2: '',
      currentEquityCo2: '',
      timeFrame: '3m'
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange1(event) {
    this.setState({
      submitEquityCo1: event.target.value,
      currentEquityCo1: event.target.value
    })
  }
  handleChange2(event) {
    this.setState({
      submitEquityCo2: event.target.value,
      currentEquityCo2: event.target.value
    })
  }

  async handleSubmit() {
    const {submitEquityCo1} = this.state
    const {submitEquityCo2} = this.state
    const {timeFrame} = this.state
    this.props.getCompanyStockPrices(
      submitEquityCo1,
      submitEquityCo2,
      timeFrame
    )
    this.setState({
      submitEquityCo1: '',
      submitEquityCo2: ''
    })
  }

  render() {
    const {series} = this.props

    return (
      <div>
        <div>
          <label>
            Pick an equity for Company 1:
            <input
              type="text"
              name="company1"
              value={this.state.submitEquityCo1}
              onChange={this.handleChange1}
            />
          </label>
        </div>
        <div>
          <label>
            Pick an equity for Company 2:
            <input
              type="text"
              name="company2"
              value={this.state.submitEquityCo2}
              onChange={this.handleChange2}
            />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </div>
        <div>
          <h2 className="tk-adobe-caslon-pro">
            Nike - P&G Trailing 3 Month Stock Prices
          </h2>
          <DiscreteColorLegend
            items={['Procter & Gamble - $PG', 'Nike - $NKE']}
            orientation="horizontal"
          />
          <XYPlot width={700} height={300} yDomain={[60, 1200]}>
            <VerticalGridLines />
            <HorizontalGridLines />

            <XAxis {...axisProps} tickFormat={String} />
            <YAxis {...axisProps} tickFormat={d => '$' + d} />

            {series.map((d, i) => <LineMarkSeries key={i} size={3} data={d} />)}
          </XYPlot>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    historicalPrices: state.chart.historicalPrices,
    portfolio: state.assetallocation.portfolio,
    series: state.compareChart.compareData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: () => dispatch(getPortfolio()),
    getCompanyStockPrices: (ticker1, ticker2, time) =>
      dispatch(getComparedStockPrice(ticker1, ticker2, time))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompareChart)
)
