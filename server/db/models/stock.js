const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  name: {
    type: Sequelize.STRING
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  priceBoughtAt: {
    type: Sequelize.INTEGER
  },
  currentMarketPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Stock
