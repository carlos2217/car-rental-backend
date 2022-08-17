require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    phoneNumber:{
        type: String,
        require: true,
    },
    dob:{
        type: Date,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    admin:{
        type: Boolean,
        default: false,
    },
})

userSchema.methods.genToken = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        phoneNumber: this.phoneNumber,
        dob: this.dob,
        admin: this.admin,
    },
    process.env.TOKENKEY
    )
    return token
}

const validate = (data) =>{
    const schema = Joi.object({
        name: Joi.string().label('Name').max(100).required(),
        email: Joi.string().email().label('Email').max(255).required(),
        password: Joi.string().label('Password').min(8).max(100).required(),
        phoneNumber: Joi.string().label('Phone Number').min(8).max(15).required(),
        dob: Joi.date().label('Data Of Birth').required(),
        address: Joi.string().label('Address').max(255).required()
    })
    return schema.validate(data)
}
const validateLogin = (data) =>{
    const schema = Joi.object({
        email: Joi.string().email().label('Email').max(255).required(),
        password: Joi.string().label('Password').min(8).max(100).required(),
    })
    return schema.validate(data)
}

const User = mongoose.model("User",userSchema)

module.exports ={
    userSchema,
    User,
    validate,
    validateLogin
}