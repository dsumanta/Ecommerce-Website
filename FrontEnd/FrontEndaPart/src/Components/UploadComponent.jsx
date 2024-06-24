import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCatagory from "../Helper/ProductCatagory";

function UploadComponent({ onClose }) {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    catagory: "",
    productImage: "",
    desription: "",
    price: "",
    selling: "",
  });
  const handleOnChange = () => {};
  return (
    <div className=" absolute w-full h-full bg-slate-200 bg-opacity-35 bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className=" bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className=" flex justify-between items-center">
          <h2 className=" text-lg font-bold"> Upload Product</h2>
          <div
            className=" w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form action="" className=" grid p-4 gap-3">
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product value"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandName" className=" mt-3" >Brand Name :</label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand value"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="catagory" className=" mt-3" >Catagory :</label>
          <select value={data.catagory} className="p-2 bg-slate-100 border rounded">
              {
                productCatagory.map((el,index)=>{
                    return (
                     <option value={el.value} key={index+el.value} >{el.label}</option>
                    )
                })
              }
          </select>
          <label htmlFor="productImage" className=" mt-3" >Product Image :</label>
          <div className=" p-2 bg-slate-100 rounded border h-8 w-full"></div>
        </form>
      </div>
    </div>
  );
}

export default UploadComponent;
