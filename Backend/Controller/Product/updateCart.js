const cartModel = require("../../Model/cartProductModel");

const updateCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUserId = req?.userId;
    const { quantity } = req?.body;
   console.log("quantity",quantity)
    const isProductAvailable = await cartModel.find({ productId,userId:currentUserId });
  
    if (isProductAvailable.length !== 0) {
      console.log("I am inside quantity")
      if(quantity==0){
        console.log("I am inside quantity condition")
         cartModel.deleteOne({productId,userId:currentUserId}).then((result=>{
          res.json({
            message: "Product Deleted from cart",
            data: [],
            error: false,
            success: true,
          });
         }))
      }
      else{
        const payLoad = {
          productId: productId,
          userId: currentUserId,
        };
        console.log(payLoad)
        cartModel.updateOne(payLoad,{$set:{quantity:quantity}})
        .then((data)=>{
          console.log("update response",data)
          res.json({
            message: "Product Updated to cart",
            data: [],
            error: false,
            success: true,
          });
        })
        .catch((error)=>{
          res.status(400).json({
            message: error,
            error: true,
            success: false,
          });
        })  
      }
    }
    else{
      res.status(400).json({
        message: "The product is not in cart",
        error: true,
        success: false,
      });
    }
   
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateCart;
