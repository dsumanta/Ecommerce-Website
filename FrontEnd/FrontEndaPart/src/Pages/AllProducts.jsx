import React, { useEffect, useState } from "react";
import UploadComponent from "../Components/UploadComponent";
import { SummeryAPI } from "../Common/ApiEndPoint";
import AdminProductCard from "../Components/AdminProductCard";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllproduct] = useState([]);
  const fetchAllProduct = async () => {
    const response = await fetch(SummeryAPI.getAllProduct.URL);
    const dataResponse = await response.json();
    setAllproduct(dataResponse.data || []);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className=" bg-white flex justify-between items-center">
        <h2 className=" font-bold text-lg py-2 px-4">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct(true)}
          className=" border-2 px-4 py-2 mx-2 border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all "
        >
          Upload Product
        </button>
      </div>
      {/* all product */}

      <div className=" flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          console.log("product->", product);
          return (
            <div key={index} className=" bg-white p-4 rounded ">
              <AdminProductCard data={product} fetchData={fetchAllProduct} />
            </div>
          );
        })}
      </div>

      {/* {upload product component} */}
      {openUploadProduct && (
        <UploadComponent onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
}

export default AllProducts;
