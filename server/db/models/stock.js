const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  name: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Stock
