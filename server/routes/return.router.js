const express = require('express')

const auth = require('../middleware/auth')
const admin = require('../middleware/adminWithToken')
const controller = require('../controllers/return.controller')

const route = express.Router()

route.get('/',[auth,admin],controller.returnedCars)

module.exports = route