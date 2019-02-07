import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Search from './Search'
import CompanyPrices from './CompanyPrices'
import PeerSelections from './PeerSelections'

export default class Selector extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="selector-container">
        <Search />
        <CompanyPrices />
        <PeerSelections />
      </div>
    )
  }
}
