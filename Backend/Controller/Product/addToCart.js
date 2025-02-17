const cartModel = require("../../Model/cartProductModel");

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUserId = req?.userId;

    const isProductAvailable = await cartModel.find({ productId,userId:currentUserId });
    console.log("isproductModelAvailable->", isProductAvailable == null);
    if (isProductAvailable.length !== 0) {
      return res.json({
        message: "Product already added to Cart",
        success: false,
        error: true,
      });
    }
    const payLoad = {
      productId: productId,
      quantity: 1,
      userId: currentUserId,
    };
    const saveProduct= new cartModel(payLoad).save()
    const updateCart = res.json({
      message: "Product Added to cart",
      data: saveProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCart;
