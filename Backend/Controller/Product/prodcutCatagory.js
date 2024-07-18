const productModel = require("../../Model/productModel");

const productCatagory = async (req, res) => {
  try {
    const product_catagory = await productModel.distinct("catagory")
    console.log("Prodcut catagory->",product_catagory)

    // array to store one product from each catogory
    const productByCatagory = [];
    for(const catagory of product_catagory){
        const product = await productModel.findOne({catagory});
        if(product) productByCatagory.push(product)
    }
    res.json({
        message:"Product catagory found",
        data:productByCatagory,
        error:false,
        success:true,
    })
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = productCatagory
