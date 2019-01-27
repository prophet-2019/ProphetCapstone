const router = require('express').Router()
const {User, Portfolio, Stock, Cash} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:portfolioId', async (req, res, next) => {
  try {
    const portfolios = await Portfolio.findById(req.params.portfolioId, {
      include: [{model: Cash}, {model: Stock}]
    })
    res.status(202).send(portfolios)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:portfolioId/buy', async (req, res, next) => {
  let stockTicker = req.body.symbol
  let realTimeQuote = req.body.latestPrice
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

    const [stock] = await Stock.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    let oldStockAmount = stock.dataValues.stockQuantity
    const [
      numberOfStockRowsAffected,
      updatedStockInstance
    ] = await Stock.update(
      {
        stockQuantity: oldStockAmount + 100,
        name: stockTicker,
        priceBoughtAt: realTimeQuote
      },
      {
        where: {
          portfolioId: req.params.portfolioId
        },
        returning: true,
        plain: true
      }
    )

    const portfolio = await Portfolio.findById(req.params.portfolioId, {
      include: [{model: Cash}, {model: Stock}]
    })
    res.status(202).send(portfolio)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:portfolioId/sell', async (req, res, next) => {
  let stockTicker = req.body.symbol
  let realTimeQuote = req.body.latestPrice
  try {
    const [cash] = await Cash.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    let oldAmount = cash.dataValues.quantity
    const [numberOfRowsAffected, updatedCashInstance] = await Cash.update(
      {
        quantity: oldAmount + 1000
      },
      {
        where: {
          portfolioId: req.params.portfolioId
        },
        returning: true,
        plain: true
      }
    )

    const [stock] = await Stock.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    let oldStockAmount = stock.dataValues.stockQuantity
    const [
      numberOfStockRowsAffected,
      updatedStockInstance
    ] = await Stock.update(
      {
        stockQuantity: oldStockAmount - 100,
        name: stockTicker,
        priceBoughtAt: realTimeQuote
      },
      {
        where: {
          portfolioId: req.params.portfolioId
        },
        returning: true,
        plain: true
      }
    )

    const portfolio = await Portfolio.findById(req.params.portfolioId, {
      include: [{model: Cash}, {model: Stock}]
    })
    res.status(202).send(portfolio)
  } catch (err) {
    next(err)
  }
})
