const router = require('express').Router()
const {User, Transaction, Stock, Portfolio} = require('../db/models')
const {getCurrentMarketValue} = require('../db/models/portfolio')
module.exports = router
const axios = require('axios')
var Sequelize = require('sequelize')
const Op = Sequelize.Op

const currentMarketPrice = async ticker => {
  const {data: iexRealtimePrice} = await axios.get(
    `https://api.iextrading.com/1.0/stock/${ticker}/quote`
  )
  return iexRealtimePrice.iexRealtimePrice
}

router.get('/:userId', async (req, res, next) => {
  try {
    const userPortfolio = await Portfolio.getPortfolio(req.params.userId)
    res.json(userPortfolio)
  } catch (error) {
    next(error.message)
  }
})
