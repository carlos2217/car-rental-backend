const {UserModle} = require('../model/user.model')

const admin = async (req,res,next) =>{
    const user = await  UserModle.findById(req.user._id)
    if(!user.admin) return res.status(403).json({message: "Unauthorized"})
    next()
}

module.exports = admin