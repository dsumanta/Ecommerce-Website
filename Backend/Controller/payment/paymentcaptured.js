// const crypto = require("crypto";
import { error } from "console";
import crypto from "crypto";
const secret_key = process.env.RAZORPAY_SECRETKEY;

export const paymentCapture = async (req, res) => {
  // do a validation
  try{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", secret_key);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    success:true,
    error:false,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
  }
  catch(error){
    res.json({
        msg: error.message|| error ,
        success:false,
        error:true,
      });
  }
};



