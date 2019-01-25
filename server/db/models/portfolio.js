const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'Portfolio'
  }
})

module.exports = Portfolio
