import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="details">
        <h4> Company Details Component </h4>
      </div>
    )
  }
}
