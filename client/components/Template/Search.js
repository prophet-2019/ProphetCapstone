import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getStockPrice} from '../../store/chart'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      historicalPrices: [],
      submitEquity: '',
      isLoaded: false,
      currentEquity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      submitEquity: evt.target.value,
      currentEquity: evt.target.value
    })
  }

  handleSubmit = () => {
    this.props.getStockPrice(this.state.submitEquity, 'ytd')
    this.setState({
      submitEquity: '',
      // isLoaded: true,
      historicalPrices: this.props.historicalPrices
    })
  }

  async componentDidMount() {
    await this.props.getStockPrice(this.state.currentEquity, 'ytd')
  }

  render() {
    return (
      <div className="search">
        <label>
          Pick an equity:
          <input
            type="text"
            value={this.state.submitEquity}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </div>
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
    getStockPrice: (ticker, time) => dispatch(getStockPrice(ticker, time))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search))
