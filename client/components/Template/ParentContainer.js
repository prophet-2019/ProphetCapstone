import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Dashboard from './Dashboard'
import UserPortfolio from './UserPortfolio'
import Header from './Header'
import Selector from './Selector'

export default class ParentContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="parent-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="portfolio-dashboard-selector-container">
          <UserPortfolio />

          <Dashboard />

          <Selector />
        </div>
      </div>
    )
  }
}
