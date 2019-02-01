import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class Headline extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header-headline">
        <h4>Headline Component</h4>
      </div>
    )
  }
}
