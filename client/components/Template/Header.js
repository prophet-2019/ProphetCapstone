import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import UserPortfolio from './UserPortfolio'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header">
        <h3>Logo</h3>
        <h4>Headline Placeholder</h4>
        <h5>Logout</h5>
        <h5>Profile</h5>
      </div>
    )
  }
}
