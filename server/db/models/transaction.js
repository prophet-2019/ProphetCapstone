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
