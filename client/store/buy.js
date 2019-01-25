import axios from 'axios'

export const BUY_STOCK = 'BUY_STOCK'

const initialState = {Stock: []}

export const boughtStock = stock => ({
  type: BUY_STOCK,
  stock
})

export const getStock = () => {
  return async dispatch => {
    console.log(data)
    try {
      const {data: gotHistoricalPrices} = await axios.get(
        `https://api.iextrading.com/1.0/stock/aapl/chart/1d`
      )
      dispatch(boughtStock(gotHistoricalPrices))
    } catch (err) {
      console.error('There are no stocks shown', err.message)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case BUY_STOCK:
      return {
        ...state,
        stock: action.stock
      }
    default:
      return state
  }
}
