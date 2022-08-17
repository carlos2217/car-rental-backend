const jwt = require('jsonwebtoken')

const auth = (req,res,next) =>{
    try {   
        const token = req.header('x-token')
        if(!token) return res.status(401).json({message: "Access Denied No Token Provide"})

        const decode = jwt.verify(token,process.env.TOKENKEY)
        req.user = decode
        next()
    } catch (ex) {
        res.status(401).json({error: ex.message})
    }
}

module.exports = auth