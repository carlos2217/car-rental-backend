const express = require('express')

const auth = require('../middleware/auth')
const admin = require('../middleware/adminWithToken')

const controller = require('../controllers/order.controller')

const route = express.Router()

route.get('/',[auth,admin],controller.orders)
route.put('/:rental/:order',[auth,admin],controller.confirm)
route.delete('/:id',[auth,admin],controller.consle)
route.get('/count',[auth],controller.ordersCount)

module.exports = route