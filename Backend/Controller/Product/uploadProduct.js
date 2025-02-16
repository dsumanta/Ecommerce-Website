const uploadProductPermission = require("../../Helper/permission");
const productModel = require("../../Model/productModel");

async function uploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const uploadProduct = productModel(req.body);
    const saveProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded succesfully",
      success: true,
      error: false,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: error.message,
      Error: true,
      success: false,
    });
  }
}

module.exports = uploadProductController;
