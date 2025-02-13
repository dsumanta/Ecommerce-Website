const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    catagory: String,
    productImage: [],
    desription: String,
    price: Number,
    sellingPrice: Number,
},{timestamps:true})

const productModel= mongoose.model("product",productSchema)

module.exports= productModel