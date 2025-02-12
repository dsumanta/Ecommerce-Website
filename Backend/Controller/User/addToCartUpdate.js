const cartModel = require("../../Model/cartProductModel");

const addToCartUpdate= async (req,res)=>{
    try {
        const cartId=req.body
        const quantity=req.body
        const allProduct= await cartModel.findByIdAndUpdate({
            _id:cartId,quantity:quantity
        })
        res.json({
            data:allProduct,
            error:false,
            success:true
        })
    }catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
    
}
module.exports = addToCartUpdate