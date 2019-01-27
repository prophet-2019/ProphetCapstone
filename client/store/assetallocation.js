import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

const initialState = {
  portfolio: {}
}

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

export const getPortfolio = () => {
  return async dispatch => {
    try {
      const {data: portfolioValues} = await axios.get(`/api/portfolios/1`)
      dispatch(gotPortfolio(portfolioValues))
    } catch (err) {
      console.error('You dont own anything', err.message)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return {
        ...state,
        portfolio: action.portfolio
      }
    default:
      return state
  }
}
