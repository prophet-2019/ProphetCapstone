import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStockPriceToBuy, getStockPriceToSell} from '../store/portfolio'
import HomePageChart from './HomePageChart'
import CompanyData from './CompanyData'

class Company extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  // arrow function should auto bind "this"
  handleSubmitBuy = e => {
    e.preventDefault()
    this.props.buyStock()
  }

  handleSubmitSell = e => {
    e.preventDefault()
    this.props.buyStock()
  }
  render() {
    console.log('props are: \n\n\n', this.props)
    return (
      <div>
        <h3>Apple</h3>
        <HomePageChart />
        <CompanyData />
        <button type="submit" onSubmit={this.handleSubmitBuy}>
          Buy
        </button>
        <button type="submit" onSubmit={this.handleSubmitSell}>
          Sell
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyStock: () => dispatch(getStockPriceToBuy()),
    sellStock: () => dispatch(getStockPriceToSell())
  }
}

const CompanyWithStore = connect(null, mapDispatchToProps)(Company)

export default CompanyWithStore
