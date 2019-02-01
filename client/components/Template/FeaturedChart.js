import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class FeaturedChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-feature">
        <h4> FeaturedChart Component </h4>
      </div>
    )
  }
}
