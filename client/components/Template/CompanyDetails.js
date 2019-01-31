import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class CompanyDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="companyDetails">
        <h4> Company Details Container </h4>
      </div>
    )
  }
}
