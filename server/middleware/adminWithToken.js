const admin = (req,res,next) =>{
    if(!req.user.admin) return res.status(403).json({message: "Unauthorized"})
    next()
}

module.exports = admin