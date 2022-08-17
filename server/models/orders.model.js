const mongoose = require('mongoose')
const Joi = require('joi')

const orderSchema = mongoose.Schema({
    aproved:{
        type: Boolean,
        default: false,
    },
    rental:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental'
    },
})

const Order = mongoose.model("Order",orderSchema)

module.exports ={
    Order,
}