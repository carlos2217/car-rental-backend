const express = require('express')

const controller = require('../controllers/user.controller')

const auth = require('../middleware/auth')
const admin = require('../middleware/adminWithToken')

const route = express.Router()

route.post('/',controller.register)
route.post('/login',controller.login)
route.get('/profile',[auth],controller.profile)
route.get('/:id',[auth,admin],controller.oneUser)
route.put('/:id',[auth],controller.update)

module.exports = route