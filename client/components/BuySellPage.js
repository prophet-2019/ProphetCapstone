import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockPriceToBuy, getStockPriceToSell} from '../store/assetallocation'
import {Button, Segment} from 'semantic-ui-react'
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
    this.props.buyStock(this.state, this.props.userId)
  }

  handleSubmitSell = e => {
    e.preventDefault()
    this.props.sellStock(this.state, this.props.userId)
  }
  componentDidMount() {
    this.setState({ticker: this.props.ticker})
  }
  componentDidUpdate() {
    if (this.state.ticker !== this.props.ticker) {
      this.setState({ticker: this.props.ticker})
    }
  }
  render() {
    const initTick = this.props.ticker ? this.props.ticker : this.state.ticker
    return (
      <div className="buy-sell-everything-container">
        <h5>Selected stock ticker:</h5>
        <div className="buy-sell-ticker">
          <h3>"{this.props.ticker}"</h3>
        </div>
        <div className="buy-sell-quantity">
          <label>Quantity to Buy or Sell: </label>
          <input
            required
            name="quantity"
            value={this.state.quantity}
            onChange={evt => this.setState({quantity: evt.target.value})}
          />
        </div>
        <div className="small ui vertical buttons">
          <Segment inverted id="buy">
            <Button
              className="ui buttons"
              inverted
              color="purple"
              type="submit"
              onClick={this.handleSubmitBuy}
            >
              Buy
            </Button>
          </Segment>
          <Segment inverted id="sell">
            <Button
              className="ui buttons"
              inverted
              color="purple"
              type="submit"
              onClick={this.handleSubmitSell}
            >
              Sell
            </Button>
          </Segment>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: (orderDetails, userId) =>
      dispatch(getStockPriceToBuy(orderDetails, userId)),
    sellStock: (orderDetails, userId) =>
      dispatch(getStockPriceToSell(orderDetails, userId))
  }
}

const CompanyWithStore = connect(mapStateToProps, mapDispatchToProps)(
  BuySellPage
)

export default CompanyWithStore
