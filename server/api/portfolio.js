const router = require('express').Router()
module.exports = router
const axios = require('axios')

router.get('/:userId', async (req, res, next) => {
  try {
    const userPortfolio = await Portfolio.getPortfolio(req.params.userId)
    res.json(userPortfolio)
  } catch (error) {
    next(error.message)
  }
})
