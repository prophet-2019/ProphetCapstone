import axios from 'axios'

const GOT_STOCK_PRICE = 'GOT_STOCK_PRICE'
const GOT_COMPANY_FINANCIALS = 'GOT_COMPANY_FINANCIALS'

const initialState = {historicalPrices: [], financials: {}}

const gotStockPrice = stock => ({
  type: GOT_STOCK_PRICE,
  stock
})

const gotFinancials = company => ({
  type: GOT_COMPANY_FINANCIALS,
  company
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

export const getFinancials = () => async dispatch => {
  try {
    const {data: financials} = await axios.get(
      `https://api.iextrading.com/1.0/stock/aapl/financials`
    )
    dispatch(gotFinancials(financials))
  } catch (err) {
    console.error('LIONS ONLY', err.message)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STOCK_PRICE:
      return {
        ...state,
        historicalPrices: action.stock
      }
    case GOT_COMPANY_FINANCIALS:
      return {
        ...state,
        financials: action.company
      }
    default:
      return state
  }
}
