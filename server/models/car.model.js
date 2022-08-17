const mongoose = require('mongoose')
const Joi = require('joi')

const carSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    model:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true,
    },
    color:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    rented:{
        type: Boolean,
        default: false
    },
})

const validate = (data) =>{
    const schema = Joi.object({
        name: Joi.string().label('Name').required(),
        model: Joi.string().label('Model').required(),
        city: Joi.string().label('City').required(),
        color: Joi.string().label('Color').required(),
        price: Joi.number().label('price').min(1).required(),
    })
    return schema.validate(data)
}

const Car = mongoose.model("Car",carSchema)

module.exports ={
    carSchema,
    Car,
    validate
}