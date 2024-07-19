const productModel = require("../../Model/productModel");

const catagoryWiseProduct = async(req,res)=>{
   try{
     const {catagory} = req?.body || req?.query
     const product = productModel.find({catagory})
     res.json({
        message:"Product by catagory",
        data:product,
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

module.exports = catagoryWiseProduct