const mongoose = require('mongoose')

const ReturnSchema = mongoose.Schema({
    rental:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental'
    },
})

const ReturnModel = mongoose.model("Return",ReturnSchema)

module.exports ={
    ReturnModel,
}