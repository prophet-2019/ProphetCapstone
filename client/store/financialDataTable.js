import axios from 'axios'

const GET_FINANCIALS = 'GET_FINANCIALS'

const initialState = {
  financials: []
}

const gotFinancialData = financialData => ({
  type: GET_FINANCIALS,
  financialData
})

export const getFinancialData = ticker => {
  return async dispatch => {
    try {
      const {data: iexJSON} = await axios.get(
        `/api/iex/getFinancialData/${ticker}`
      )
      const annualFinancialReportFromIEX = await iexJSON
      dispatch(gotFinancialData(annualFinancialReportFromIEX))
    } catch (err) {
      console.error(
        'No data to report on this company. Call the SEC.',
        err.message
      )
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FINANCIALS:
      return {
        ...state,
        financials: action.financialData
      }
    default:
      return state
  }
}
