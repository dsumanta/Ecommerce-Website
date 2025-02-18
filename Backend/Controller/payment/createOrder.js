// const Razorpay = require("razorpay");
import Razorpay from "razorpay";


export const createPaymentOrderId =async (req,res) => {
  const {amount,paymentId} = req.body
  console.log("amount",amount)
  console.log("paymentd",paymentId)
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRETKEY,
  });

  var options = {
    amount: amount, 
    currency: "INR",
    receipt: paymentId,
    payment_capture:1
  };
  try{
    const response = await instance.orders.create(options)
        res.json({
            success:true,
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
  }
  catch(error){
    console.log("Error in payment",error)
    res.status(400).json({
        message: "Unable to process order Request",
        error: true,
        success: false,
      });
  }
};
