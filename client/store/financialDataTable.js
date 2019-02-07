import axios from 'axios'

const GET_FINANCIALS = 'GET_FINANCIALS'
const GET_NEWS = 'GET_NEWS'

const initialState = {
  financials: [],
  news: []
}

const gotFinancialData = financialData => ({
  type: GET_FINANCIALS,
  financialData
})

const gotNews = news => ({
  type: GET_NEWS,
  news
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
        `https://api.iextrading.com/1.0/stock/${ticker}/news`
      )
      dispatch(gotNews(newsArr))
    } catch (err) {
      console.error('No news about this company', err.message)
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
    default:
      return state
  }
}
