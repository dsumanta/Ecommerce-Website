import React, { useContext, useEffect, useState } from "react";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";
import updateCart from "../Helper/updateCart";
import Context from "../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getcartProducts } from "../Helper/getCartProducts";
import { setCartDetails } from "../store/CartSlice";
import { Link, useNavigate } from "react-router-dom";

function CartCheckout() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cart?.cartDeatils || []);
  const [cartDetails, setcart] = useState(cartData);
  const [deatilToUpdateIncart, setDetailsToUpdate] = useState({});
  const navigate= useNavigate()

  const context = useContext(Context);
  console.log("cartDetailsFromRedux", cartDetails);
  const fetchProducts = async () => {
    const res = await getcartProducts();
    console.log("fetch from API", res);

    if (res.length !== 0) {
      dispatch(setCartDetails(res));
      setcart(res);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const { fetchAddToCartProduct } = useContext(Context);
  console.log("cartDetailsrender", cartDetails);
  const handleChange = async (e, index) => {
    // Add index parameter
    const { name, value } = e.target;
    if (name === "quantity" && value <= 0) {
      return;
    }
    const deatilToUpdateIncart1 = {
      productId: cartDetails?.product?.[index]?._id,
      quantity: value,
    };
    setDetailsToUpdate(deatilToUpdateIncart1);
    // const handler= setTimeout(async () => {
    //   await updateCart(deatilToUpdateIncart)
    // fetchProducts()
    // }, (500));
    // return ()=>clearTimeout(handler)
  };
  useEffect(() => {
    if (!deatilToUpdateIncart["productId"]) return;
    const handler = setTimeout(async () => {
      await updateCart(deatilToUpdateIncart);
      fetchProducts();
    }, 500);
    return () => clearTimeout(handler);
  }, [deatilToUpdateIncart]);
  const handlclick = async (e, index) => {
    const productToremove = {
      productId: cartDetails?.product?.[index]?._id,
      quantity: 0,
    };

    await updateCart(productToremove);
    fetchAddToCartProduct();
    fetchProducts();
  };
  console.log("deatilToUpdateIncart", deatilToUpdateIncart);
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Your Cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center ">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <div
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {context?.productCountCart == 0 && (
                            <div className="m-10 p-7 text-center text-xl">
                              Your cart is empty
                            </div>
                          )}
                          {cartDetails?.product?.map((item, index) => {
                            return (
                              item?.["quantity"] !== 0 && (
                                <div key={index}>
                                  <div className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item["productImage"]?.[0]}
                                        alt={item["desription"]}
                                        className="h-full w-full object-cente object-scale-down mix-blend-multiply"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href="#">
                                              {item["productName"]}
                                            </a>
                                          </h3>
                                          <p className="ml-4">
                                            {DisplayINDCurrency(
                                              item["sellingPrice"] *
                                                (deatilToUpdateIncart[
                                                  "productId"
                                                ] &&
                                                deatilToUpdateIncart[
                                                  "productId"
                                                ] === item["_id"]
                                                  ? deatilToUpdateIncart[
                                                      "quantity"
                                                    ]
                                                  : item?.["quantity"])
                                            )}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item["catagory"]}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className=" flex gap-2">
                                          <label>Qty</label>
                                          <input
                                            className=" text-center w-8 rounded bg-slate-400"
                                            name="quantity"
                                            type="number"
                                            // disabled={item?.["quantity"]<=1}
                                            value={
                                              deatilToUpdateIncart[
                                                "productId"
                                              ] &&
                                              deatilToUpdateIncart[
                                                "productId"
                                              ] === item["_id"]
                                                ? deatilToUpdateIncart[
                                                    "quantity"
                                                  ]
                                                : item?.["quantity"]
                                            }
                                            onChange={(e) =>
                                              handleChange(e, index)
                                            }
                                          />
                                        </div>
                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={(e) =>
                                              handlclick(e, index)
                                            }
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{DisplayINDCurrency(cartDetails?.totalPrice || 0)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div onClick={()=> context?.productCountCart !==0? navigate('/summary'):navigate("/")} className="mt-6 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                         {context?.productCountCart == 0?"Explore product":"Checkout"}
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                      {context?.productCountCart == 0?"":"Or"}
                        <button
                          type="button"
                          onClick={()=>navigate("/")}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {context?.productCountCart == 0?"":"Checkout"}
                          {context?.productCountCart !== 0 && (<span aria-hidden="true"> &rarr;</span>)}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCheckout;
