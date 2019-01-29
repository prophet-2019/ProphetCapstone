const Sequelize = require('sequelize')
const db = require('../db')

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
