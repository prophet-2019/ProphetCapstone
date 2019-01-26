const router = require('express').Router()
const {User} = require('../db/models')
const Portfolio = require('../db/models/Portfolio')
const {Stock} = require('../db/models/stock')
const Cash = require('../db/models/cash')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:portfolioId/cash', async (req, res, next) => {
  try {
    const cash = await Cash.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    res.status(202).send(cash)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:portfolioId/cash', async (req, res, next) => {
  try {
    const [cash] = await Cash.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    let oldAmount = cash.dataValues.quantity
    const [numberOfRowsAffected, updatedCashInstance] = await Cash.update(
      {
        quantity: oldAmount - 1000
      },
      {
        where: {
          portfolioId: req.params.portfolioId
        },
        returning: true,
        plain: true
      }
    )
    res.status(202).send(updatedCashInstance)
  } catch (err) {
    next(err)
  }
})
