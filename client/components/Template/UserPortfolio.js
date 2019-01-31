import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class UserPortfolio extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="userportfolio-container">
        <h4> UserPortfolio Container </h4>
      </div>
    )
  }
}
