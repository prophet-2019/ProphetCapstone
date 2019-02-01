import axios from 'axios'

const GET_PORTFOLIO = 'GET_PORTFOLIO'

const initialState = {
  portfolio: []
}

const gotPortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

export const getPortfolio = () => {
  return async dispatch => {
    try {
      const {data: portfolioValues} = await axios.get(`/api/portfolio/1`)
      const pib = []
      const tickersObj = await portfolioValues.reduce(async (accum, val) => {
        if (val.ticker !== 'MONEY') {
          const {data: currPrice} = await axios.get(
            `/api/iex/stockprice/${val.ticker}`
          )
          const priceIn = +val.quantity * +currPrice
          pib.push([val.ticker, priceIn])
        } else {
          pib.push([val.ticker, val.quantity])
        }
        return pib
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
