const productModel = require("../../Model/productModel");
const uploadProductPermission = require("../../Helper/permission");

async function updateProductController(req, res) {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const { _id, ...restBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, restBody, {
      new: true,
    });
    console.log("update product->", updateProduct);
    res.json({
      message: "Product updated successfully",
      data: updateProduct,
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
}

module.exports = updateProductController;
