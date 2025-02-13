import React, { useEffect, useState } from "react";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { Link } from "react-router-dom";

function CatagoryList() {
  const [productCatagory, setProductCatagory] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCatagoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummeryAPI.getProductByCatagory.URL);
    const dataResponse = await response.json();
    setLoading(false);
    setProductCatagory(dataResponse.data);
  };
  useEffect(() => {
    fetchCatagoryProduct();
  }, []);

  const catagoryLoading = new Array(13).fill(null);
  return (
    <div className=" container mx-auto p-4">
      <div className=" flex justify-center items-center gap-2 overflow-scroll scroll-bar">
        {loading
          ? catagoryLoading.map((el, index) => {
              <div
                key={index}
                className=" h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse "
              ></div>;
            })
          : productCatagory.map((product, index) => {
              console.log("product->", product);
              return (
                <Link
                  to={"/catagory-product/" + product.catagory}
                  key={index}
                  className=" cursor-pointer"
                >
                  <div className=" h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4 bg-slate-300 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product.catagory}
                      className=" h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className=" text-center text-sm md:text-base capitalize">
                    {product.catagory}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default CatagoryList;
