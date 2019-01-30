const Sequelize = require('sequelize')
const db = require('../db')
const Portfolio = require('./portfolio')

const Transaction = db.define('transaction', {
  ticker: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  transQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  transactionType: Sequelize.ENUM('buy', 'sell')
})

module.exports = Transaction

/**
 * classMethod
 */

Transaction.findByUser = function(userId) {
  return Transaction.findAll({
    where: {
      userId
    }
  })
}

Transaction.findByUserAndStock = function(userId, ticker) {
  return Transaction.findAll({
    where: {
      userId,
      ticker
    }
  })
}

Transaction.createTrade = function(
  ticker,
  price,
  transQuantity,
  transactionType,
  userId
) {
  return Transaction.create({
    ticker,
    price,
    transQuantity,
    transactionType,
    userId
  })
}

Transaction.afterCreate(async transaction => {
  const transCost = transaction.transQuantity * transaction.transQuantity
  const portToUpdate = await Portfolio.findOne({
    where: {
      ticker: transaction.ticker,
      userId: transaction.userId
    }
  })
  if (portToUpdate && transaction.transactionType === 'buy') {
    console.log('port', portToUpdate.quantity, typeof portToUpdate.quantity)
    await Portfolio.update(
      {
        quantity: portToUpdate.quantity + transaction.transQuantity,
        costValue: portToUpdate.costValue + transCost
      },
      {
        where: {
          ticker: transaction.ticker,
          userId: transaction.userId
        }
      }
    )
  } else if (portToUpdate && transaction.transactionType === 'sell') {
    await Portfolio.update(
      {
        quantity: portToUpdate.quantity - transaction.transQuantity,
        //needs to get original transaction cost LIFO/FIFO?
        costValue: portToUpdate.costValue - transCost
      },
      {
        where: {
          ticker: transaction.ticker,
          userId: transaction.userId
        }
      }
    )
  } else {
    await Portfolio.create({
      ticker: transaction.ticker,
      quantity: transaction.transQuantity,
      costValue: transCost,
      userId: transaction.userId
    })
  }
})
