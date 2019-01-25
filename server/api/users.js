const router = require('express').Router()
const {User} = require('../db/models')
const Portfolio = require('../db/models/Portfolio')
const {Stock} = require('../db/models/stock')
const Cash = require('../db/models/cash')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.put('/:userId/portfolio/:portfolioId', async (req, res, next) => {
//   try {
//     const updatedPortfolio = await Portfolio.update({
//       where: {
//         userId: req.params.userId,
//         portfolioId: req.params.portfolioId
//       },
//       include: [{model: Cash}, {model: Stock}]
//     })
//     res.status(202).json(updatedPortfolio)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:userId/portfolio', async (req, res, next) => {
//   try {
//     const portfolios = await Portfolio.findAll({where: {
//       userId: req.params.userId,
//     }},{
//       include: [{ model: Cash }]
//     } )
//     console.log("portfolios: ", portfolios)
//     // let oldAmount = cash.quantity
//     // const updatedCash = await cash.update(
//     // {
//     //   quantity:
//     //     oldAmount - 100
//     // },
//     // {
//     //   where: {
//     //     id: portfolios.dataValues.cashId
//     //   }
//     // })
//     res.status(202).send(portfolios)
//   } catch (err) {
//     next (err)
//   }
// })

router.put('/:userId/portfolio/:portfolioId', async (req, res, next) => {
  console.log('REQ\n\n\n\n\n\n\n\n', req.params)
  try {
    const portfolios = await Portfolio.findById(req.params.portfolioId)
    const portWithCash = await portfolios.findAll({include: [{model: Cash}]})
    console.log('portfolios: \n\n\n\n\n\n\n', portWithCash)
    let oldAmount = Cash.quantity
    const updatedCash = await Cash.update(
      {
        quantity: oldAmount - 100
      },
      {
        where: {
          id: portfolios.dataValues.cashId
        }
      }
    )
    res.status(202).send(updatedCash)
  } catch (err) {
    next(err)
  }
})
