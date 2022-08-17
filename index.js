require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const userRoute = require('./server/routes/user.route')
const lineseRoute = require('./server/routes/linese.route')
const carRoute = require('./server/routes/car.route')
const rentalRoute = require('./server/routes/rental.route')
const orderRoute = require('./server/routes/order.route')
const retrunRoute = require('./server/routes/return.router')

const app = express()

mongoose.connect(process.env.DB)
.then(() => console.log("Connected To Database..."))
.catch(ex => console.log(ex.message))

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(compression())

app.use('/api/users/',userRoute)
app.use('/api/linese/',lineseRoute)
app.use('/api/cars/',carRoute)
app.use('/api/rentals/',rentalRoute)
app.use('/api/orders/',orderRoute)
app.use('/api/returns/',retrunRoute)

const PORT = process.env.PORT | 3000 
app.listen(PORT, () => console.log(`listening to port: ${PORT}`))