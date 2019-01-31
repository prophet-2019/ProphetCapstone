import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import chart from './chart'
import portfolio from './portfolio'
import assetallocation from './assetallocation'
import compareChart from './compareChart'

const reducer = combineReducers({
  user,
  chart,
  portfolio,
  assetallocation,
  compareChart
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
