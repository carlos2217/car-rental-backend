const _ = require('lodash')
const {Rental,validate,confirm} = require('../models/rental.model')
const {Car} = require('../models/car.model')
const {User} = require('../models/user.model')
const {Order} = require('../models/orders.model')

exports.rent = async (req,res)=>{
    try {
        const {error} = validate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})
        
        let car = await Car.findById(req.params.car)
        if(!car) return res.status(404).json({message: "Car Is Not Found"})
        
        let user = await User.findById(req.params.user) 
        if(!user) return res.status(404).json({message: "User Is Not Found"})

        let rent = await Rental.findOne({user: req.params.user})
        if(rent) return res.status(400).json({message: "You Can Only Rent One Car"})
        

        rent = new Rental({
            days: req.body.days,
            totalPrice: req.body.days * car.price,
            car: req.params.car,
            user: req.params.user  
        })

        
        await Car.findByIdAndUpdate(
            req.params.car,
            {
                $set: {
                    rented: true
                }
            },
        )

        const order = new Order({
            rental: rent._id
        })

        await rent.save()
        await order.save()
        res.status(200).send(rent)
    } catch (ex) {
        for(feild in ex.errors){
            res.status(400).send(ex.errors[feild].message);
        }
        res.status(400).send(ex.message);
    }
}

exports.returnCars = async (req,res) =>{
    try {
        const date_ob = new Date()
        const rentals = await Rental.find({ returnData: {$lte: date_ob}}).populate('user car')
        res.status(200).send(rentals)        
    } catch (error) {
        res.status(400).send(ex.message);
    }
}

exports.returnCount = async (req,res) =>{
    try {
        const date_ob = new Date()
        const result = await Rental.find({ returnData: {$lte: date_ob}}).count()
        res.status(200).send(JSON.stringify(result))
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}

exports.returned = async (req,res) =>{
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.car,
            {
                $set:{
                    rented: false
                }
            },
            {new:true}
        )
        if(!car) return res.status(404).json({message: "Car Is Not Found"})
        const rental = await Rental.findByIdAndDelete(req.params.id,)
        if(!rental) return res.status(404).json({message: "Rental Is Not Found"})
        res.status(200).send(car)
    } catch (ex) {
        res.status(400).send(ex.message);
    }
}