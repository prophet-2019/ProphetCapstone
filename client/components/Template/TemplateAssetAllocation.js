import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class TemplateAssetAllocation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="templateAssetAllocation">
          <h4> Asset Allocation Chart </h4>
        </div>
      </div>
    )
  }
}
