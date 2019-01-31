import React, {Component} from 'react'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  DiscreteColorLegend,
  VerticalGridLines,
  LineMarkSeries
} from 'react-vis'
import {getStockPrice} from '../store/chart'
import {getPortfolio} from '../store/assetallocation'
import {getFinancials} from '../store/chart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

// const data = [
//   [0, 71.9764, 87.5474],
//   [1, 74.2895, 88.4899],
//   [2, 74.818, 87.984],
//   [3, 76.5628, 88.8868],
//   [4, 76.3534, 89.1051],
//   [5, 77.3006, 90.4842],
//   [6, 76.3434, 90.7917],
//   [7, 77.7393, 90.5735],
//   [8, 77.5498, 90.6429],
//   [9, 76.1341, 91.6847],
//   [10, 74.8778, 91.9724],
//   [11, 74.9775, 92.7364],
//   [12, 74.9775, 92.7562],
//   [13, 74.1101, 93.0935],
//   [14, 74.5188, 93.0836],
//   [15, 72.3054, 92.5578],
//   [16, 70.9096, 91.3771],
//   [17, 72.1559, 90.6925],
//   [18, 71.2785, 90.8215],
//   [19, 72.4949, 91.2184],
//   [20, 71.8767, 91.9922],
//   [21, 74.4391, 92.28],
//   [22, 74.12, 92.0915],
//   [23, 75.12, 93.7682],
//   [24, 77.94, 92.5875],
//   [25, 75.79, 92.5776],
//   [26, 75.54, 92.8157],
//   [27, 73.34, 91.7244],
//   [28, 72.51, 92.2998],
//   [29, 73.57, 93.1729],
//   [30, 74.32, 93.292],
//   [31, 72.93, 95.7327],
//   [32, 72.53, 95.8815],
//   [33, 69.9, 92.0418],
//   [34, 71.15, 91.764],
//   [35, 68.97, 91.0398],
//   [36, 67.53, 90.2659],
//   [37, 72.37, 90.256],
//   [38, 68.1, 86.6743],
//   [39, 73.01, 89.3829],
//   [40, 73.67, 91.2977],
//   [41, 73.34, 90.4643],
//   [42, 74.14, 91.1985],
//   [43, 74.06, 90.5635],
//   [44, 72.75, 89.9286],
//   [45, 74.65, 91.764],
//   [46, 75.72, 91.397],
//   [47, 76.73, 91.7343],
//   [48, 76.59, 90.2361],
//   [49, 76.42, 90.4544],
//   [50, 76.04, 91.0497],
//   [51, 76.09, 90.4346],
//   [52, 77.88, 91.2878],
//   [53, 77.68, 90.6528],
//   [54, 79.13, 90.64],
//   [55, 80.45, 91.42],
//   [56, 80.75, 90.44],
//   [57, 80.5, 94.84],
//   [58, 80.44, 94.3],
//   [59, 80.61, 93.6]
// ]

const axisProps = {
  tickSizeInner: 0,
  style: {line: {stroke: '#939393', strokeWidth: '1px'}}
}

class CompareChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historicalPricesCo1: [],
      historicalPricesCo2: [],
      portfolio: {},
      submitEquityCo1: '',
      currentEquityCo1: '',
      submitEquityCo2: '',
      currentEquityCo2: '',
      timeFrame: '3m',
      compareData: []
    }
    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.compareCompanyData = this.compareCompanyData.bind(this)
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
    await this.props.getStockPrice(submitEquityCo1, timeFrame)
    const co1Data = await this.props.historicalPrices

    await this.props.getStockPrice(submitEquityCo2, timeFrame)
    const co2Data = await this.props.historicalPrices

    const compareData = this.compareCompanyData(co1Data, co2Data)

    this.setState({
      submitEquityCo1: '',
      submitEquityCo2: '',
      historicalPricesCo1: co1Data,
      historicalPricesCo2: co2Data,
      compareData: await compareData
    })
  }

  async compareCompanyData(company1Data, company2Data) {
    const result = await company1Data.map((arr, idx) =>
      arr.concat(company2Data[idx][1])
    )
    return result
  }

  render() {
    const {compareData} = this.state
    const series = [2, 1].map(i => compareData.map(d => ({x: d[0], y: d[i]})))
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
  connect(mapStateToProps, mapDispatchToProps)(CompareChart)
)
