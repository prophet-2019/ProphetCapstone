import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockPriceToBuy, getStockPriceToSell} from '../store/portfolio'

class BuySellPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ticker: '',
      realTime: 0,
      quantity: 0
    }
    this.handleSubmitBuy = this.handleSubmitBuy.bind(this)
    this.handleSubmitSell = this.handleSubmitSell.bind(this)
  }
  handleSubmitBuy(e) {
    e.preventDefault()
    this.props.buyStock(this.state)
  }

  handleSubmitSell = e => {
    e.preventDefault()
    this.props.sellStock()
  }
  render() {
    return (
      <div>
        <h1>UConn Buy or Sell</h1>
        <label>Stock Ticker</label>
        <input
          required
          name="ticker"
          value={this.state.ticker}
          onChange={evt => this.setState({ticker: evt.target.value})}
        />
        <label>Quantity</label>
        <input
          required
          name="quantity"
          value={this.state.quantity}
          onChange={evt => this.setState({quantity: evt.target.value})}
        />
        <button type="submit" onClick={this.handleSubmitBuy}>
          Buy, Buy, Buy
        </button>
        <button type="submit" onClick={this.handleSubmitBuy}>
          Sell, Sell, Sell
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: orderDetails => dispatch(getStockPriceToBuy(orderDetails)),
    sellStock: () => dispatch(getStockPriceToSell())
  }
}

const CompanyWithStore = connect(null, mapDispatchToProps)(BuySellPage)

export default CompanyWithStore
