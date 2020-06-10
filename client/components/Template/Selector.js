import React, {Component} from 'react'
import Search from './Search'
import CompanyPrices from './CompanyPrices'
import PeerSelections from './PeerSelections'

export default class Selector extends Component {
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
