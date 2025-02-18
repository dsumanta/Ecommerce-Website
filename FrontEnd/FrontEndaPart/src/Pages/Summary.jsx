import { useSelector } from "react-redux";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";
import { useContext, useEffect, useState } from "react";
import Context from "../Context/AuthContext";
import { getOrderId } from "../Helper/paymentCheckout";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const SummaryPage = () => {
  const [paymentFailed, setPaymentFaild] = useState(false);
  const [loader, setLoader] = useState(false);
  const {fetchAddToCartProduct} = useContext(Context)
  const navigate = useNavigate();
  const cartData = useSelector((state) => state?.cart?.cartDeatils || []);
  const productToCreatAfterPayment = cartData?.product?.map((item)=>{
    return {productId:item._id,quantity:item.quantity,price:item.quantity*item.sellingPrice}
  })
  const context = useContext(Context);
  const Orderpayload = {
    paymentId: "jfifwnwidwidwmdw",
    amount: cartData?.totalPrice * 100,
  };
  const doRazorpayTransaction = async (e) => {
    setLoader(true);
    //create order
    const getOrderIdByamount = await getOrderId(Orderpayload);
    console.log("orderId", getOrderIdByamount);
    // do payment and validate

    var options = {
      key: process.env.RAZORPAY_SECRETKEY, // Enter the Key ID generated from the Dashboard
      amount: getOrderIdByamount.amount, // Amount is in currency subunits.
      currency: "INR",
      name: "Dcart", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: getOrderIdByamount.order_id,
      handler: async function (response) {
        const body = {
          response:response,
          product:productToCreatAfterPayment 
        };

        const validateRes = await fetch(SummeryAPI.paymentcapture.URL, {
          method: SummeryAPI.paymentcapture.method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const jsonRes = await validateRes.json();
        console.log("handlerResponse", jsonRes);
        if (jsonRes.success) {
          setPaymentFaild(false);
          fetchAddToCartProduct()
          navigate("/order-summary", {
            state: { orderId: jsonRes.orderId, paymentId: jsonRes.paymentId },
          });
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Sumanta Das", //your customer's name
        email: "dsumanta31746@gmail.com",
        contact: "7683939325", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      // alert(response.error.code);
      toast(response.error.description);
      setPaymentFaild(true);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
    setLoader(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Order Summary ({context?.productCountCart})
        </h2>

        {cartData && cartData.product && cartData.product.length > 0 ? ( // Check if cartData and cartData.product exist and are not empty
          cartData.product?.map((item, index) => (
            <div key={index} className="space-y-4">
              {" "}
              {/* Add a unique key prop */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={item?.productImage[0]}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item?.productName}
                  </h3>{" "}
                  {/* Replace with dynamic data */}
                  <p className="text-sm text-gray-500">{`Brand: ${item?.brandName} , Quantity: ${item?.quantity}`}</p>{" "}
                  {/* Replace with dynamic data */}
                </div>
                <p className="font-semibold text-gray-900 w-20 text-right">
                  {DisplayINDCurrency(item?.sellingPrice * item?.quantity)}
                </p>{" "}
                {/* Replace with dynamic data */}
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p> // Display a message if the cart is empty
        )}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-base text-gray-900 mb-2">
            <p>Subtotal</p>
            <p className="font-semibold">
              {DisplayINDCurrency(cartData?.totalPrice)}
            </p>
          </div>
          <div className="flex justify-between text-base text-gray-500 mb-4">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
            <p>Total</p>
            <p>{DisplayINDCurrency(cartData?.totalPrice)}</p>
          </div>

          <button
            disabled={loader}
            onClick={doRazorpayTransaction}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loader
              ? "Redirecting"
              : paymentFailed
              ? "Transaction Failed Retry"
              : "Proced to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};
