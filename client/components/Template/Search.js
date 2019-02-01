import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class Search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="search">
        <h4> Search Component </h4>
      </div>
    )
  }
}
