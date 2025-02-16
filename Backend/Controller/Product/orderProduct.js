const cartModel = require("../../Model/cartProductModel");
const orderModel = require("../../Model/orderModel");
const productModel = require("../../Model/productModel");

const getProductDetails= async (req,res)=>{
    try{
       const {cartIds}= req.body;
       const {currentUser} = req.userId
       const orderedProduct= cartIds.map(async (item)=>{
           const res= await cartModel.find({item})
           return {productId:res.productId,userId:res.userId}
       })
       
       const order= new orderModel({
        userId:currentUser,
        product:orderedProduct
       })
       const confirmOrder= await order.save()
       
       res.json({
        message:"order successfull",
        data:confirmOrder,
        success:true,
        error:false
       })
    }
    catch (error) {
        res.status(400).json({
          message: error.message || error,
          error: true,
          success: false,
        });
      }
}
module.exports = getProductDetails