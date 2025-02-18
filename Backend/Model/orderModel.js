const mongoose = require('mongoose');

const orderedProductSchema = new mongoose.Schema({ // Note: _Schema suffix
    productId: String,
    quantity: Number,
    price:Number
}, { _id: false }); // Important: Prevent Mongoose from creating _id for subdocuments

const orderSchema = new mongoose.Schema({
    userId: String,
    orderId: String,
    products: [orderedProductSchema], // Use the schema directly, not an instance
}, { timestamps: true });

const orderModel = mongoose.model("orderModel", orderSchema);

module.exports = orderModel;