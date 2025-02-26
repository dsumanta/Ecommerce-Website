import React, { useContext, useEffect, useState } from "react";
import { SummeryAPI } from "../Common/ApiEndPoint";
import Context from "../Context/AuthContext";
import CartCheckout from "../Components/CartCheckout";

function Cart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  const context = useContext(Context);
  // const [cartUpdate,setCartUpdate]= useState()
  const cartLoader = new Array(context.productCountCart).fill(null);
  // const fetchData = async () => {
  //   setLoading(true);
  //   const response = await fetch(SummeryAPI.addToCartProductView.URL, {
  //     method: SummeryAPI.addToCartProductView.method,
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   const responseData = await response.json();
  //   if (responseData.success) {
  //     let product = [];
  //     responseData.data?.map((item) => {
  //       fetchProductDetails(item?.["productId"]).then((prod) => {
  //         const producrDetails = { ...prod.data, quantity: item["quantity"] };
  //         console.log("price inside promise", prod?.data?.sellingPrice);
  //         setTotalAmount((prev) => {
  //           prev = prev + prod?.data?.sellingPrice;
  //           return prev;
  //         });
  //         product.push(producrDetails);
  //       });
  //     });

  //     setProductDetails(product);
  //     setLoading(false);
  //     // setData(responseData.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   fetchData();
  // }, [cartUpdate]);
  // const fetchProductDetails = async (item) => {
  //   const res = await fetch(SummeryAPI.productdetails.URL, {
  //     method: SummeryAPI.productdetails.method,
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ productId: item }),
  //   });
  //   const product = await res.json();
  //   return product;
  // };

  return (
    <div className=" container mx-auto flex flex-col lg:flex-row gap-3">
      <div className=" text-center text-lg my-3">
        {data.length == 0 && !loading && (
          <p className=" bg-white py-5">Your cart is empty</p>
        )}
      </div>
      <div className=" w-full max-w-3xl ">
        {loading ? (
          cartLoader.map((el, index) => {
            return (
              <div
                key={index}
                className=" w-full h-28 bg-slate-400 my-2 border-slate-400 animate-pulse duration-1000"
              ></div>
            );
          })
        ) : (
          <div>
            <CartCheckout />
          </div>
        )}
      </div>
      <div className=" mx-auto my-5 w-full max-w-2xl">
        {loading ? (
          <div className=" h-36 bg-slate-300 animate-pulse">Total</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Cart;
