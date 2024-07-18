const productModel = require("../../Model/productModel");

const getProductController = async (req, res) => {
  try {
    const getProduct = await productModel.find().sort({ createdAt: -1 });
    res.status(201).json({
      message: "All product fetched",
      success: true,
      error: false,
      data: getProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
