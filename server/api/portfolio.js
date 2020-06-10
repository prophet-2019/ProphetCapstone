const router = require('express').Router()
module.exports = router
const axios = require('axios')

export const currentMarketPrice = async ticker => {
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
