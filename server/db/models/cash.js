const Sequelize = require('sequelize')
const db = require('../db')

const Cash = db.define('cash', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 100000,
    validate: {
      min: 0
    }
  }
})

module.exports = Cash
