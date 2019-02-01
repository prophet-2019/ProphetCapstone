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
export const getStockPriceToBuy = (orderDetails, userId) => {
  return async dispatch => {
    try {
      const {data: iexRealTimeQuote} = await axios.get(
        `https://api.iextrading.com/1.0/stock/${orderDetails.ticker}/quote`
      )
      // eventually we will pass the price and stock quantity with the axios call
      const updatedPortfolio = await axios.put(`/api/users/${+userId}/buy`, {
        iexRealTimeQuote,
        orderDetails
      })
      dispatch(boughtStock(updatedPortfolio))
    } catch (err) {
      console.error('There are no stocks shown', err.message)
    }
  }
}

export const getStockPriceToSell = (orderDetails, userId) => {
  return async dispatch => {
    try {
      const {data: iexRealTimeQuote} = await axios.get(
        `https://api.iextrading.com/1.0/stock/${orderDetails.ticker}/quote`
      )
      // eventually we will pass the price and stock quantity with the axios call
      const updatedPortfolio = await axios.put(`/api/users/${+userId}/sell`, {
        iexRealTimeQuote,
        orderDetails
      })
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
