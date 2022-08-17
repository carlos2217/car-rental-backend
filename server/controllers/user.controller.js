const _ = require('lodash')
const bcrypt = require('bcrypt')

const {User,validate,validateLogin} = require('../models/user.model')
const {Linese} = require('../models/lineses.model')

exports.register = async (req,res) =>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        let user = await User.findOne({email: req.body.email})
        if(user)  return res.status(400).json({message: "User Is Already Registered"})

        user = new User(_.pick(req.body,['name','email','password','phoneNumber','address','dob']))

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)

        user.password = hash

        const result = await user.save()

        res.status(200).send(result)
    } catch (ex) {
        for(feild in ex.errors){
            console.log(ex.errors[feild].message);
        }
        console.log(ex.message);
    }
}
exports.login = async (req,res) =>{
    try {
        const {error} = validateLogin(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})
        
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({message: "Email Or Password Is UnValid"})
        
        const password = await bcrypt.compare(req.body.password,user.password)
        if(!password) return res.status(400).json({message: "Email Or Password Is UnValid"})
        
        const token = user.genToken()
        
        res.status(200)
        .header("access-control-expose-headers","x-token")
        .header('x-token',token)
        .send(user)
        
    } catch (ex) {
        for(feild in ex.errors){
            console.log(ex.errors[feild].message);
        }
        console.log(ex.message);
    }

}
exports.update = async (req,res) =>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                }
            },
            {new:true}
        )

        if(!user) return res.status(404).json({message: "user not Found"})

        res.status(200).send(user)
    } catch (ex) {
        res.status(404).json(ex.message)
    }
}
exports.oneUser = async (req,res) =>{
    try {
        
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message: "User Not Found"})
        const lin = await Linese.findOne({user: user._id})

        res.status(200).json({user,lin})
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.profile = async (req,res) =>{
    try {
        const me = await User.findById(req.user._id)
        res.status(200).json(me)
    } catch (ex) {
        res.status().json({message: ex.message})
    }
}