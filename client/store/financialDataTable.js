import axios from 'axios'
import {buildRoute} from '../helpers/iex-helpers'

const GET_FINANCIALS = 'GET_FINANCIALS'
const GET_NEWS = 'GET_NEWS'
const GET_STATS = 'GET_STATS'

const initialState = {
  financials: [],
  news: [],
  company: []
}

const gotFinancialData = financialData => ({
  type: GET_FINANCIALS,
  financialData
})

const gotNews = news => ({
  type: GET_NEWS,
  news
})

const gotCompanyStats = stats => ({
  type: GET_STATS,
  stats
})

export const getFinancialData = ticker => {
  return async dispatch => {
    try {
      const {data: iexJSON} = await axios.get(
        `/api/iex/getFinancialData/${ticker}`
      )
      const annualFinancialReportFromIEX = await iexJSON
      dispatch(gotFinancialData(annualFinancialReportFromIEX))
    } catch (err) {
      console.error(
        'No data to report on this company. Call the SEC.',
        err.message
      )
    }
  }
}

export const getNews = ticker => {
  return async dispatch => {
    try {
      const {data: newsArr} = await axios.get(
        buildRoute(`/stock/${ticker}/news`)
      )
      dispatch(gotNews(newsArr))
    } catch (err) {
      console.error('No news about this company', err.message)
    }
  }
}

export const getStats = ticker => {
  return async dispatch => {
    try {
      const {data: stats} = await axios.get(
        buildRoute(`/stock/${ticker}/stats`)
      )
      const {data: earnings} = await axios.get(
        buildRoute(`/stock/${ticker}/earnings`)
      )
      const {data: health} = await axios.get(
        buildRoute(`/stock/${ticker}/financials`)
      )
      let currentRatio =
        health.financials[0].currentCash / health.financials[0].currentDebt
      let arrWithAggregateData = [
        ['Growth', earnings.earnings[0].yearAgoChangePercent],
        ['Health', currentRatio],
        ['Valuation', stats.priceToSales],
        ['Profitability', stats.returnOnAssets]
      ]
      dispatch(gotCompanyStats(arrWithAggregateData))
    } catch (err) {
      console.error('No information', err.message)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FINANCIALS:
      return {
        ...state,
        financials: action.financialData
      }
    case GET_NEWS:
      return {
        ...state,
        news: action.news
      }
    case GET_STATS:
      return {
        ...state,
        company: action.stats
      }
    default:
      return state
  }
}
