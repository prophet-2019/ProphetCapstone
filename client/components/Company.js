import React, {Component} from 'react'
import HomePageChart from './HomePageChart'
import CompanyData from './CompanyData'

class Company extends Component {
  render() {
    return (
      <div>
        <h3>Apple</h3>
        <HomePageChart />
        <CompanyData />
        <button type="buy">Buy</button>
        <button type="sell">Sell</button>
      </div>
    )
  }
}

export default Company
