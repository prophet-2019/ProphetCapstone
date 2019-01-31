import axios from 'axios'

//action variable
const BUY_STOCK = 'BUY_STOCK'
const SELL_STOCK = 'SELL_STOCK'
// const INCREASE_CASH = 'INCREASE_CASH'
// const DECREASE_CASH = 'DECREASE_CASH'

const initialState = {
  portfolio: {
    cash: 0,
    stocks: 0
  }
}

//action creator
const boughtStock = stockBought => ({
  type: BUY_STOCK,
  stockBought
})

const soldStock = updatedPortfolio => ({
  type: SELL_STOCK,
  updatedPortfolio
})

// thunks
export const getStockPriceToBuy = () => {
  return async dispatch => {
    try {
      const {data: iexRealTimeQuote} = await axios.get(
        `https://api.iextrading.com/1.0/stock/aapl/quote`
      )
      // eventually we will pass the price and stock quantity with the axios call
      const updatedPortfolio = await axios.put(
        `/api/users/1/buy`,
        iexRealTimeQuote
      )
      console.log('Updated Port\n\n\n\n\n', updatedPortfolio)
      dispatch(boughtStock(updatedPortfolio))
    } catch (err) {
      console.error('There are no stocks shown', err.message)
    }
  }
}

export const getStockPriceToSell = () => {
  return async dispatch => {
    try {
      const {data: iexRealTimeQuote} = await axios.get(
        `https://api.iextrading.com/1.0/stock/aapl/quote`
      )
      // eventually we will pass the price and stock quantity with the axios call
      const updatedPortfolio = await axios.put(
        `/api/users/1/sell`,
        iexRealTimeQuote
      )
      dispatch(soldStock(updatedPortfolio))
    } catch (err) {
      console.error('There are no stocks shown', err.message)
    }
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case BUY_STOCK:
      return {
        ...state,
        portfolio: action.stockBought
      }
    case SELL_STOCK:
      return {
        ...state,
        portfolio: action.updatedPortfolio
      }
    default:
      return state
  }
}
