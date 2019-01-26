const User = require('./user')
const Portfolio = require('./portfolio')
const Cash = require('./cash')
const Stock = require('./stock')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Portfolio.belongsTo(User)
User.hasMany(Portfolio)
User.hasMany(Stock)
// Portfolio.belongsTo(Cash)
// Cash.hasOne(Portfolio)
Portfolio.hasMany(Cash)
// Portfolio.belongsTo(Stock)
// Stock.hasOne(Portfolio)
Portfolio.hasMany(Stock)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Portfolio,
  Cash,
  Stock
}
