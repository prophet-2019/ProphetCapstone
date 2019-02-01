import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import PortfolioList from './PortfolioList'
import TemplateAssetAllocation from './TemplateAssetAllocation'

export default class UserPortfolio extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="portfolio-container">
        <PortfolioList />
        <TemplateAssetAllocation />
      </div>
    )
  }
}
