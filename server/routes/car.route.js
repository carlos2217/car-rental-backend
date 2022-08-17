const express = require('express')

const controller = require('../controllers/car.controller')

const auth = require('../middleware/auth')
const admin = require('../middleware/adminWithToken')

const route = express.Router()

route.post('/',[auth,admin],controller.create)
route.get('/all',[auth,admin],controller.allCars)
route.get('/mycar',[auth],controller.myCar)
route.get('/availableCars',controller.availableCars)
route.get('/search/:key',controller.search)
route.get('/:id',[auth],controller.getOneCar)
route.delete('/:id',[auth,admin],controller.deleteCar)
route.put('/:id',[auth,admin],controller.updateCar)

module.exports = route