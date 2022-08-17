const _ = require('lodash')
const {Car,validate} = require('../models/car.model')
const {Rental} = require('../models/rental.model')
const {User} = require('../models/user.model')

exports.create = async (req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})
        
        const car = new Car(_.pick(req.body,['name','model','city','color','price','rented']))

        await car.save()
        res.status(200).send(car)

    } catch (ex) {
        for(feild in ex.errors){
            res.status(400).send(ex.errors[feild].message);
        }
        res.status(400).send(ex.message);
    }
}
exports.getOneCar = async (req,res)=>{
    try {

        const car = await Car.findById(req.params.id).select('-_id -__v')
        if(!car) return res.status(404).json({message: "Car Not Found"})

        res.status(200).send(car)

    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.allCars = async (req,res)=>{
    try {
        const car = await Car.find().select('-__v')
        if(!car) return res.status(404).json({message: "Car Not Found"})

        res.status(200).send(car)
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.deleteCar = async (req,res)=>{
    try {
        const car = await Car.findByIdAndDelete(req.params.id,{new: true})
        if(!car) return res.status(404).json({message: "Car Not Found"})

        res.status(200).send(car)
    }catch (ex) {
        for(feild in ex.errors){
            res.status().send(ex.errors[feild].message);
        }
        res.status().send(ex.message);
    }
}
exports.updateCar = async (req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        const car = await Car.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    name: req.body.name,
                    model: req.body.model,
                    color: req.body.color,
                    city: req.body.city,
                    price: req.body.price
                }
            },
            {new: true}
        )
        if(!car) return res.status(404).json({message: "Car Not Found"})

        res.status(200).send(car)
    }catch (ex) {
        for(feild in ex.errors){
            res.status().send(ex.errors[feild].message);
        }
        res.status().send(ex.message);
    }
}
exports.availableCars = async (req,res) =>{
    try {
        const cars = await Car.find({rented: false}).sort('name').select('-__v')
        res.status(200).send(cars)
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.search = async (req,res) =>{
    try {
        const data = await Car.find({
            "$or":[
                {model: {$regex: req.params.key}}
            ]
        })
        res.status(200).send(data)
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.myCar = async (req,res) =>{
    try {
        const user = await User.findById(req.user._id)
        if(!user) return res.status(404).json({message: "User Not Found"})
        const mycar = await Rental.findOne({user: user._id}).populate('car')
        if(!mycar) return res.status(404).json({message: "Car Not Found"})
        res.send(mycar)
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}