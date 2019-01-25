const Sequelize = require('sequelize')
const db = require('../db')

const Cash = db.define('cash', {
  name: {
    type: Sequelize.INTEGER,
    defaultValue: 100000
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cash
