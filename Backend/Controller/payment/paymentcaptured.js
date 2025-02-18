// const crypto = require("crypto";
import { error } from "console";
import crypto from "crypto";
import orderModel from "../../Model/orderModel.js";
import { promises } from "dns";
import cartModel from "../../Model/cartProductModel.js"
const secret_key = process.env.RAZORPAY_SECRETKEY;

export const paymentCapture = async (req, res) => {
  // do a validation
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.response;
    const currentUser = req.userId;
    const { product } = req.body;
    console.log("products", product);
    // varify signature
    const sha = crypto.createHmac("sha256", secret_key);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
    // create successfull order
    const ordersavePayload = {
      userId: currentUser,
      orderId: razorpay_order_id,
      products: product,
    };
    new orderModel(ordersavePayload).save();
    await deleteProductFromcart(ordersavePayload)
    console.log("I am here in after delete")
    console.log("Order saved to DB");
    res.json({
      msg: "success",
      success: true,
      error: false,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteProductFromcart=async (payLoad)=>{
   try{
    const deletePromises = payLoad.products.map(product => { 
      return cartModel.deleteOne({ productId: product.productId, userId: payLoad.userId });
    });
    await Promise.all(deletePromises);
   }
   catch(error){
    console.log("Error in deleting product from cart",error)
    throw new Error("Error deleting the Cart product")
   }
}
