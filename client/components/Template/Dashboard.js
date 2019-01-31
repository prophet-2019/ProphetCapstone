import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-container">
        <h4> Dashboard Container </h4>
      </div>
    )
  }
}
