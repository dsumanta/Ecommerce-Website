const mongoose = require('mongoose')

// const orderSchema = new mongoose.Schema({
//     userId:String,
//     quantity:Number,
//     productId:String,
// },{timestamps:true})

const orderedProduct= new mongoose.Schema({
    productId:String,
    quantity:Number,
})

const orderSchema= new mongoose.Schema({
    userId:String,
    product:[orderedProduct]
})

const orderModel= mongoose.model("orderModel",orderSchema)

module.exports= orderModel