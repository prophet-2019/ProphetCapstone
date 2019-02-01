import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class ChartSelections extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="chartSelections">
        <h4> Chart Selections Component </h4>
      </div>
    )
  }
}
