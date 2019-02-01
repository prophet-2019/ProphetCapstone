import React, {Component} from 'react'
import HomePageChart from '../HomePageChart'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class FeaturedChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="dashboard-feature">
        <HomePageChart />
      </div>
    )
  }
}
