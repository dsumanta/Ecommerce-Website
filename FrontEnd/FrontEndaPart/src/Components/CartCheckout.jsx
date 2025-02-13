import React, { useState } from "react";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";

function CartCheckout({ cartData, totalAmount, setCartdata }) {
  const [cartDetails, setCartDetails] = useState(cartData);
  const handleChange = (e, index) => {
    // Add index parameter
    const { name, value } = e.target; 
    const deatilToUpdateIncart = {
      productId: cartDetails[index]?._id,
      quantity: value,
    };
    setCartdata(deatilToUpdateIncart)
    setCartDetails((prevCartDetails) => {
      return prevCartDetails.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value };
        } else {
          return item;
        }
      });
    });
  };
  console.log("cartProduct", cartDetails);
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
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
                      <div className="ml-3 flex h-7 items-center">
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
                          {cartDetails?.map((item, index) => {
                            return (
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
                                          <a href="#">{item["productName"]}</a>
                                        </h3>
                                        <p className="ml-4">
                                          {DisplayINDCurrency(
                                            item["sellingPrice"]
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
                                          value={item?.["quantity"]}
                                          onChange={(e) =>
                                            handleChange(e, index)
                                          }
                                        />
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{DisplayINDCurrency(totalAmount)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
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
