import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Search from './Search'
import CompanyPrices from './CompanyPrices'
import ChartSelections from './ChartSelections'

export default class Selector extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="selector-container">
        {/* <h4> Selector Container </h4> */}
        <div className="search-container">
          <Search />
        </div>
        <div className="companyPrices-container">
          <CompanyPrices />
        </div>
        <div className="chartSelections-container">
          <ChartSelections />
        </div>
      </div>
    )
  }
}
