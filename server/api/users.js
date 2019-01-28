const router = require('express').Router()
const {User, Transaction, Stock} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'cash']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(transactions)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/buy', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        userId: req.params.userId
      }
    })

    res.send(transactions)
  } catch (error) {
    next(error)
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

router.put('/:userId/buy', async (req, res, next) => {
  // let stockTicker = req.body.symbol
  // let realTimeQuote = req.body.latestPrice
  // let quantity = req.body.quantity
  let stockTicker = 'TSLA'
  let realTimeQuote = 50
  let quantity = 2
  try {
    // check to see if the stock exists in Stock table.  If not, create it.
    await Stock.findOrCreate({
      where: {
        name: stockTicker
      }
      // check to see if the user has enough cash
    })
    const user = await User.findById(req.params.userId)
    console.log('User', user)
    if (user.dataValues.cash >= realTimeQuote * quantity) {
      const buy = Transaction.create({
        ticker: stockTicker,
        price: realTimeQuote,
        transQuantity: 100,
        transactionType: 'buy',
        userId: req.params.userId,
        stockId: 1
      })
      res.send(buy)
    } else {
      throw new Error('Not enough $$')
    }
    // if yes, create the transaction.
    // if not, throw error.
    // then send updated portfolio

    // let oldAmount = cash.dataValues.quantity
    // const [numberOfRowsAffected, updatedCashInstance] = await Cash.update(
    //   {
    //     quantity: oldAmount - 1000
    //   },
    //   {
    //     where: {
    //       portfolioId: req.params.portfolioId
    //     },
    //     returning: true,
    //     plain: true
    //   }
    // )

    // const [stock] = await Stock.findAll({
    //   where: {
    //     portfolioId: req.params.portfolioId
    //   }
    // })
    // let oldStockAmount = stock.dataValues.stockQuantity
    // const [
    //   numberOfStockRowsAffected,
    //   updatedStockInstance
    // ] = await Stock.update(
    //   {
    //     stockQuantity: oldStockAmount + 100,
    //     name: stockTicker,
    //     priceBoughtAt: realTimeQuote
    //   },
    //   {
    //     where: {
    //       portfolioId: req.params.portfolioId
    //     },
    //     returning: true,
    //     plain: true
    //   }
    // )

    // const portfolio = await Portfolio.findById(req.params.portfolioId, {
    //   include: [{model: Cash}, {model: Stock}]
    // })
    // res.status(202).send(portfolio)
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
