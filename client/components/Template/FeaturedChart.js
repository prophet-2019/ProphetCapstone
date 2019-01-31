import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class FeaturedChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="featuredchart">
        <h4> FeaturedChart Container </h4>
      </div>
    )
  }
}
