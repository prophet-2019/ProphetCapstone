const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  ticker: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  costValue: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  currentMarketValue: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Portfolio
