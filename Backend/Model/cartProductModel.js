const mongoose = require('mongoose')

const cartProductScheme = new mongoose.Schema({
    productId:String,
    quantity:Number,
    userId:String,
},{timestamps:true})

const cartModel= mongoose.model("addTocart",cartProductScheme)

module.exports= cartModel