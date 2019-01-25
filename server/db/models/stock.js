const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  name: {
    type: Sequelize.STRING
  },
  stockQuantity: {
    type: Sequelize.INTEGER
  },
  priceBoughtAt: {
    type: Sequelize.INTEGER
  },
  currentMarketPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Stock
