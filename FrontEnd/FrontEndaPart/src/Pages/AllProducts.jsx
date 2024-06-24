import React, { useState } from "react";
import UploadComponent from "../Components/UploadComponent";

function AllProducts() {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  return (
    <div>
      <div className=" bg-white flex justify-between items-center">
        <h2 className=" font-bold text-lg py-2 px-4">All Product</h2>
        <button onClick={()=>setOpenUploadProduct(true)} className=" border-2 px-4 py-2 mx-2 border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all ">
          Upload Product
        </button>
      </div>
      {/* {upload product component} */}
      {openUploadProduct && <UploadComponent onClose= {()=>setOpenUploadProduct(false)} />}
    </div>
  );
}

export default AllProducts;
