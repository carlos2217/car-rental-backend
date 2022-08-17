const mongoose = require('mongoose')
const Joi = require('joi')
const { number } = require('joi')

const rentalSchema = mongoose.Schema({
    rentalData:{
        type: Date,
        default: Date.now(),
    },
    returnData:{
        type: Date,
        default: null
    },
    totalPrice:{
        type: Number,
    },
    days:{
        type: Number,
        require: true,
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const validate = (data) =>{
    const schema = Joi.object({
        days: Joi.number().label('Nuber Of Days').required(),
    })
    return schema.validate(data)
}
const confirmValidate = (data) =>{
    const schema = Joi.object({
        returnData: Joi.date().label('Return Date').required(),
    })
    return schema.validate(data)
}

const Rental = mongoose.model("Rental",rentalSchema)

module.exports ={
    Rental,
    validate,
    confirmValidate
}