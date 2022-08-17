const express = require('express')

const auth = require('../middleware/auth')
const controller = require('../controllers/rental.controller')

const route = express.Router()

route.post('/:user/:car',[auth],controller.rent)
route.get('/return',[auth],controller.returnCars)
route.get('/count',[auth],controller.returnCount)
route.put('/:id/:car/retured',[auth],controller.returned)

module.exports = route