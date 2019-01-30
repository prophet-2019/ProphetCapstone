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
    const transactions = await Transaction.findByUser(req.params.userId)
    res.send(transactions)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/portfolio', async (req, res, next) => {
  try {
    const userPortfolio = await User.getPortfolio(req.params.userId)
    res.send(userPortfolio)
  } catch (error) {
    next(error)
  }
})

// router.get('/:userId/portfolio', async (req, res, next) => {
//   try {
//     const usersTransactions = await Transaction.findByUser(req.params.userId)
//     const getPortfolio = usersTransactions.reduce((accum, val) => {
//       let tickTick = val.dataValues.ticker
//       let shares = val.dataValues.transQuantity
//       let transType = val.dataValues.transactionType
//       if (transType === 'sell') {
//         shares *= -1
//       }
//       if (accum[tickTick] !== undefined) {
//         accum[tickTick] += shares
//       } else {
//         accum[tickTick] = shares
//       }
//       return accum
//     }, {})
//     res.send(getPortfolio)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/:userId/buy', async (req, res, next) => {
  // let stockTicker = req.body.symbol
  // let realTimeQuote = req.body.latestPrice
  // let quantity = req.body.quantity
  let stockTicker = 'GE'
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
    let cashValue = realTimeQuote * quantity
    if (user.dataValues.cash >= realTimeQuote * quantity) {
      const buy = await Transaction.createTrade(
        stockTicker,
        realTimeQuote,
        115,
        'buy',
        req.params.userId
      )
      res.send(buy)
    } else {
      throw new Error('Not enough $$')
    }
    await user.cashUpdate(req.params.userId, cashValue)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/sell', async (req, res, next) => {
  //check if user owns that stock
  let stockTicker = 'GE'
  let realTimeQuote = 50
  let shares = 2
  let quantity = shares * realTimeQuote
  let cashValue = realTimeQuote * quantity * -1
  try {
    const ownsIt = await Transaction.findByUserAndStock(
      req.params.userId,
      stockTicker
    )
    if (!ownsIt) {
      throw new Error("Sorry, you don't own this.")
    }
    //check all buys
    //check all sells
    const howMuch = ownsIt.reduce((accum, val) => {
      let transType = val.dataValues.transactionType
      let quant = val.dataValues.transQuantity
      if (transType === 'sell') {
        quant *= -1
      }
      accum += quant
      return accum
    }, 0)
    //create sell transaction
    if (howMuch >= quantity) {
      const sellSellSell = await Transaction.createTrade(
        stockTicker,
        realTimeQuote,
        115,
        'sell',
        req.params.userId
      )
      const findUser = await User.findById(req.params.userId)
      //make sure to User.findById AND let cashValue to negative
      await findUser.cashUpdate(req.params.userId, cashValue)
      res.send(sellSellSell)
    } else {
      throw new Error("you don't own enough!")
    }
  } catch (error) {
    next(error.message)
  }
})
