require('dotenv').config()
const mongoose = require('mongoose')
const Joi = require('joi')

const lineseSchema = mongoose.Schema({
    issueData:{
        type: Date,
        require: true,
    },
    expiredDate:{
        type: Date,
        require: true,
    },
    number:{
        type: String,
        require: true,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const validate = (data) =>{
    const schema = Joi.object({
        issueData: Joi.date().label('Issue Date').required(),
        expiredDate: Joi.date().label('Expired Date').required(),
        number: Joi.string().label('Number').required(),
    })
    return schema.validate(data)
}

const Linese = mongoose.model("Linese",lineseSchema)

module.exports ={
    lineseSchema,
    Linese,
    validate
}