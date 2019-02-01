import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

const initialState = {
  portfolio: []
}

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

export const getPortfolio = userId => {
  console.log(userId)
  return async dispatch => {
    try {
      const {data: portfolioValues} = await axios.get(
        `/api/portfolio/${userId}`
      )
      const arrForPortfolioBecauseReduceAsynIssue = []
      const tickersObj = await portfolioValues.reduce(async (accum, val) => {
        if (val.ticker !== 'MONEY') {
          const {data: currPrice} = await axios.get(
            `/api/iex/stockprice/${val.ticker}`
          )
          const priceIn = +val.quantity * +currPrice
          arrForPortfolioBecauseReduceAsynIssue.push([val.ticker, priceIn])
        } else {
          arrForPortfolioBecauseReduceAsynIssue.push([val.ticker, val.quantity])
        }
        return arrForPortfolioBecauseReduceAsynIssue
      }, [])
      dispatch(gotPortfolio(tickersObj))
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
