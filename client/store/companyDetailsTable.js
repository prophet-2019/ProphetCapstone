import axios from 'axios'

const GET_REAL_TIME_COMPANY_STATS = 'GET_REAL_TIME_COMPANY_STATS'

const ENABLE_COMPARE = 'ENABLE_COMPARE'

const initialState = {
  stats: {},
  compare: false
}

const gotPortfolioDataForTableFormat = companyStats => ({
  type: GET_REAL_TIME_COMPANY_STATS,
  companyStats
})

const compare = () => ({
  type: ENABLE_COMPARE,
  compare: true
})

export const getPortfolioData = ticker => {
  return async dispatch => {
    try {
      const {data: iexJSON} = await axios.get(`/api/iex/getStats/${ticker}`)
      const companyStats = await iexJSON
      dispatch(gotPortfolioDataForTableFormat(companyStats))
    } catch (err) {
      console.error(
        'No data to report on this company. Call the SEC.',
        err.message
      )
    }
  }
}

export const revealCompare = () => {
  return dispatch => {
    dispatch(compare())
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REAL_TIME_COMPANY_STATS:
      return {
        ...state,
        stats: action.companyStats
      }
    case ENABLE_COMPARE:
      return {
        ...state,
        compare: action.compare
      }
    default:
      return state
  }
}
