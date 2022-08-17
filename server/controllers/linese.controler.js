const { find } = require('lodash')
const {Linese,validate} = require('../models/lineses.model')

exports.create = async (req,res) => {
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        let = linese = await Linese.findOne({number: req.body.number})
        if(linese) return res.status(400).json({message: "Linese Already exist"})

        linese = new Linese({
            issueData: req.body.issueData,
            expiredDate: req.body.expiredDate,
            number: req.body.number,
            user: req.user._id
        })

        await linese.save()
        res.status(200).send(linese)
    } catch (ex) {
        for(feild in ex.errors){
            console.log(ex.errors[feild].message);
        }
        console.log(ex.message);
    }
}
exports.allLinese = async (req,res) => {
    try {
        const linese = await Linese.find().populate('user','-_id -__v')
        res.status(200).send(linese)
    } catch (ex) {
        res.status(401).json({message: ex.message})
    }
}
exports.userLinese = async (req,res) => {
    try {
        const linese = await Linese.findOne({user: req.user._id}).populate('user','-_id -__v')
        res.status(200).send(linese)
    } catch (ex) {
        res.status(401).json({message: ex.message})
    }
}
exports.update = async (req,res) => {
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        const linese = await Linese.findOneAndUpdate(
            {number: req.body.number},
            {
                $set:{
                    issueData: req.body.issueData,
                    expiredDate: req.body.expiredDate
                }
            },
            {new: true})
        if(!linese) return res.status(404).json({message: 'not found'})

        res.status(200).send(linese)
    }  catch (ex) {
        for(feild in ex.errors){
            console.log(ex.errors[feild].message);
        }
        console.log(ex.message);
    }
}