import axios from 'axios'

const GOT_STOCK_PRICE = 'GOT_STOCK_PRICE'
const GOT_COMPANY_FINANCIALS = 'GOT_COMPANY_FINANCIALS'
const GOT_REAL_TIME_PRICE = 'GOT_REAL_TIME_PRICE'

const initialState = {historicalPrices: [], financials: {}, realTimePrice: 0}

const gotStockPrice = (prices, ticker, ticker2) => ({
  type: GOT_STOCK_PRICE,
  prices,
  ticker,
  ticker2
})

const gotFinancials = company => ({
  type: GOT_COMPANY_FINANCIALS,
  company
})

const gotStockPriceForAssetAllocation = stock => ({
  type: GOT_REAL_TIME_PRICE,
  stock
})

export const getStockPrice = (ticker, time, ticker2 = '') => async dispatch => {
  try {
    const {data: gotHistoricalPrices} = await axios.get(
      `/api/iex/getChartData/${ticker}/${time}`
    )
    dispatch(gotStockPrice(gotHistoricalPrices, ticker, ticker2))
  } catch (err) {
    console.error('BIGGG Drama Show', err.message)
  }
}

export const getStockPriceForAssetAllocation = ticker => async dispatch => {
  try {
    const {data: realTimePrice} = await axios.get(
      `https://api.iextrading.com/1.0/stock/${ticker}/price`
    )
    dispatch(gotStockPriceForAssetAllocation(realTimePrice))
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
        historicalPrices: action.prices,
        ticker: action.ticker,
        ticker2: action.ticker2
      }
    case GOT_REAL_TIME_PRICE:
      return {
        ...state,
        realTimePrice: action.stock
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
