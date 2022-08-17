const { Order } = require('../models/orders.model')
const { Rental,confirmValidate } = require('../models/rental.model')
const { ReturnModel } = require('../models/return.model')
const { Car } = require('../models/car.model')

exports.orders = async (req,res) =>{
    try {
        const orders = await Order.find({aproved: false}).populate('rental')
        .populate({
            path: 'rental',
            populate: {
                path: 'car',
                module: 'Car'
            }
        })
        .populate({
            path: 'rental',
            populate: {
                path: 'user',
                module: 'User'
            }
        })
        res.status(200).send(orders) 
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}   
exports.confirm = async (req,res) =>{
    try {
        const {error} = confirmValidate(req.body)
        if(error) return res.status(400).json({message: error.details[0].message})

        let rental = await Rental.findById(req.params.rental)
        if(!rental) return res.status(404).json({message: "rental Not Found"})
        
        let order = await Order.findById(req.params.order)
        if(!order) return res.status(404).json({message: "rental Not Found"})

        await Rental.findByIdAndUpdate(
            req.params.rental,
            {
                $set:{
                    returnData: req.body.returnData
                }
            },
            {new: true}            
        )
        await Order.findByIdAndUpdate(
            req.params.order,
            {
                $set:{
                    aproved: true
                }
            },
            {new: true}
        )
        const Rtn = new ReturnModel({
            rental: req.params.rental
        })
        await Rtn.save()
        res.status(200).send(Rtn)

    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.consle = async (req,res) =>{
    try {
        let order = await Order.findById(req.params.id).populate('rental')

        if(!order) return res.status(404).json({message: "Order not Found"})

        await Order.findByIdAndDelete(order._id,{new: true})
        await Car.findByIdAndUpdate(
            order.rental.car,
            {
                $set:{
                    rented: false
                }
            },
            {new: true}
        )
        await Rental.findByIdAndRemove(order.rental._id,{new:true})
        res.send(order);
    } catch (ex) {
        res.status(400).json({message: ex.message})
    }
}
exports.ordersCount = async (req,res) =>{
    try {
        const result = await Order.find({aproved: false}).count()
        res.status(200).send(JSON.stringify(result))
    } catch (ex) {
        console.log(ex.message);
    }
}