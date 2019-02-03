import React, {Component} from 'react'
import axios from 'axios'
import {getPriceFromAPI} from '../store/ticker'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import ReactTicker from 'react-ticker'

import TickerItem from './TickerItem'

const Ticker = ({data}) => {
  return (
    // <ReactTicker>
    //   <p>Hi</p>
    // </ReactTicker>
    <div className="ticker-wrapper">
      <div className={data.length === 0 ? 'ticker' : 'ticker scrolling'}>
        {data.map(symbol => (
          <div key={symbol.symbol} className="ticker__item">
            <TickerItem symbol={symbol} />
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.ticker.data
  }
}

export default withRouter(connect(mapStateToProps, null)(Ticker))
