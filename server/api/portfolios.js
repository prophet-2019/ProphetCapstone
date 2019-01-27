const router = require('express').Router()
const {User, Portfolio, Stock, Cash} = require('../db/models')
module.exports = router

router.get('/:portfolioId', async (req, res, next) => {
  try {
    const findPortfolio = await Portfolio.findById(req.params.portfolioId, {
      include: [{model: Cash}, {model: Stock}]
    })
    res.send(findPortfolio)
  } catch (err) {
    next(err)
  }
})
