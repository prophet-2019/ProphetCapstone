import axios from 'axios'

const GET_REAL_TIME_COMPANY_STATS = 'GET_REAL_TIME_COMPANY_STATS'

const initialState = {
  stats: {}
}

const gotPortfolioDataForTableFormat = companyStats => ({
  type: GET_REAL_TIME_COMPANY_STATS,
  companyStats
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

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_REAL_TIME_COMPANY_STATS:
      return {
        ...state,
        stats: action.companyStats
      }
    default:
      return state
  }
}
