const cartModel = require("../../Model/cartProductModel");

const addToCartView= async (req,res)=>{
    try {
        const currentUser= req.userId;
        const allProduct= await cartModel.find({
            userId:currentUser
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
module.exports = addToCartView