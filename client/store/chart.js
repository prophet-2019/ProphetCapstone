import axios from 'axios'

const GOT_STOCK_PRICE = 'GOT_STOCK_PRICE'

const initialState = {historicalPrices: []}

const gotStockPrice = stock => ({
  type: GOT_STOCK_PRICE,
  stock
})

export const getStockPrice = () => async dispatch => {
  try {
    const {data: gotHistoricalPrices} = await axios.get(
      `https://api.iextrading.com/1.0/stock/aapl/chart/3m`
    )
    dispatch(gotStockPrice(gotHistoricalPrices))
  } catch (err) {
    console.error('BIGGG Drama Show', err.message)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STOCK_PRICE:
      return {
        ...state,
        historicalPrices: action.stock
      }
    default:
      return state
  }
}
