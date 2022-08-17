const express = require('express')

const controller = require('../controllers/linese.controler')

const auth = require('../middleware/auth')
const admin = require('../middleware/adminWithToken')

const route = express.Router()

route.post('/',[auth],controller.create)
route.get('/all',[auth,admin],controller.allLinese)
route.get('/user',[auth],controller.userLinese)
route.put('/update',[auth],controller.update)

module.exports = route