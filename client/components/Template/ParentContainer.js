import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Dashboard from './Dashboard'
import UserPortfolio from './UserPortfolio'
import Header from './Header'

export default class ParentContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="parent-container">
        <h2> Parent Container </h2>

        <div className="header">
          <Header />
        </div>
        <div className="main-dashboard">
          <div className="portfolio">
            <UserPortfolio />
          </div>
          <div className="dashboard">
            <Dashboard />
          </div>
        </div>
      </div>
    )
  }
}
