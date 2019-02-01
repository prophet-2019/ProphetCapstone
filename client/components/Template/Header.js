import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import HeadlineComponent from './HeadlineComponent'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-child-container">
        <div className="header-Logo">
          <h3>Logo</h3>
        </div>

        <HeadlineComponent />

        <div className="header-logout">
          <h5>Logout</h5>
        </div>

        <div className="header-profile">
          <h5>Profile</h5>
        </div>
      </div>
    )
  }
}
