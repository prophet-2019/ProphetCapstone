import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

export default class PortfolioList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="portfoliolist">
          <h4> List of portfolio values </h4>
        </div>
      </div>
    )
  }
}
