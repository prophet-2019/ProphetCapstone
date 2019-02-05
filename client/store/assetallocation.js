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
  return async dispatch => {
    try {
      const {data: portfolioValues} = await axios.get(
        `/api/portfolio/${userId}`
      )
      const arrForPortfolioBecauseReduceAsynIssue = []
      //for loop
      //drop values into arrForPortfolioBecauseReduceAsynIssue
      //return arrForPortfolioBecauseReduceAsynIssue
      for (let i = 0; i < portfolioValues.length; i++) {
        let val = portfolioValues[i]
        if (val.ticker !== 'MONEY') {
          const {data: currPrice} = await axios.get(
            `/api/iex/stockprice/${val.ticker}`
          )
          const priceIn = +val.quantity * +currPrice
          arrForPortfolioBecauseReduceAsynIssue.push([
            val.ticker,
            priceIn,
            val.quantity
          ])
        } else {
          arrForPortfolioBecauseReduceAsynIssue.push([
            val.ticker,
            val.quantity,
            val.quantity
          ])
        }
      }
      dispatch(gotPortfolio(arrForPortfolioBecauseReduceAsynIssue))
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
