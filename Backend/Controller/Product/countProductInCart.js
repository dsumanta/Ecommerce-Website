const cartModel = require("../../Model/cartProductModel");

const countProductInCart = async (req, res) => {
  try {
    const userId = req?.userId;
    const count = await cartModel.countDocuments({ userId: userId });
    console.log("count->",count)
    res.json({
      data: {
        count: count,
      },
      message: "Number of product is fetched",
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

module.exports = countProductInCart;
