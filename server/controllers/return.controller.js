const { ReturnModel } = require('../models/return.model')

exports.returnedCars = async (req,res) =>{
    try {
        const result = await ReturnModel.find()
        .select('-__v')
        .populate('rental')
        res.status(200).json({result})
    } catch (ex) {
        console.log(ex.message);
    }
}