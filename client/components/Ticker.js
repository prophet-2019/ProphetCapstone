import React, {Component} from 'react'
import axios from 'axios'
import {getPriceFromAPI} from '../store/ticker'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import TickerItem from './TickerItem'

const Ticker = ({data}) => {
  return (
    <div className={data.length === 0 ? 'ticker' : 'ticker scrolling'}>
      {data.map(symbol => (
        <div key={symbol.symbol} className="ticker__item">
          <TickerItem symbol={symbol} />
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.ticker.data
  }
}

export default withRouter(connect(mapStateToProps, null)(Ticker))
