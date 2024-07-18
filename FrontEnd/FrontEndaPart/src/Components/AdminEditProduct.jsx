import React from "react";
import { IoClose } from "react-icons/io5";
import productCatagory from "../Helper/ProductCatagory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadedImage from "../Helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";
import { useState } from "react";

const AdminEditProduct = ({ onClose, EditData,FetchData }) => {
  const [fullScreeImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [data, setData] = useState({
    ...EditData,
    productName: EditData?.productName,
    brandName: EditData?.brandName,
    catagory: EditData?.catagory,
    productImage: EditData?.productImage || [],
    desription: EditData?.desription,
    price: EditData?.price,
    sellingPrice: EditData?.sellingPrice,
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log("Name->", name);
    console.log("value->", value);
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const file = e.target.files;
    const uploadImageCloudinary = await uploadedImage(file[0]);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
    console.log("Image Uploaded->", uploadImageCloudinary.url);
  };

  //delete product

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  // upload product
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummeryAPI.updateProduct.URL, {
      method: SummeryAPI.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("response", responseData);
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      FetchData();
    }
    if (responseData.Error) {
      toast.error(responseData.message);
    }
  };
  return (
    <div className=" absolute w-full h-full bg-slate-200 bg-opacity-35 bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className=" bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className=" flex justify-between items-center">
          <h2 className=" text-lg font-bold"> Edit Product</h2>
          <div
            className=" w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form
          action=""
          className=" grid p-4 gap-3 pb-5 overflow-y-scroll h-full"
          onSubmit={handlesubmit}
          noValidate
        >
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product value"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brandName" className=" mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter Brand value"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="catagory" className=" mt-3">
            Catagory :
          </label>
          <select
            value={data.catagory}
            className="p-2 bg-slate-100 border rounded"
            name="catagory"
            onChange={handleOnChange}
            required
          > 
            <option value={""}>Select Catagory</option>
            {productCatagory.map((el, index) => {
              return (
                <option value={el.value} key={index + el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className=" mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageProduct">
            <div className=" p-2 bg-slate-100 rounded border h-32 w-full flex justify-center items-center cursor-pointer">
              <div className=" text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p>Upload Product Image</p>
                <input
                  type="file"
                  name="productImage"
                  id="uploadImageProduct"
                  className=" hidden"
                  onChange={handleUploadProduct}
                  required
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className=" flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div key={index} className=" relative group">
                      <img
                        src={el}
                        alt="el"
                        width={80}
                        height={80}
                        className=" bg-slate-10 border cursor-pointer"
                        onClick={() => {
                          setFullScreenImage(el);
                          setOpenFullScreenImage(true);
                        }}
                      />
                      <div
                        onClick={() => handleDeleteProductImage(index)}
                        className=" cursor-pointer absolute text-white bottom-0 right-0 bg-red-500 p-1 rounded-full hidden group-hover:block"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className=" text-red-500">*Please Upload Image</p>
            )}
          </div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="price">Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className=" p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="desription">Description</label>
          <textarea
            placeholder="Enter product Description"
            className=" h-28 bg-slate-200 border resize-none"
            rows={3}
            onChange={handleOnChange}
            name="desription"
            required
            value={data.desription}
          ></textarea>
          <button
            type="submit"
            className=" px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700"
          >
            Update Product
          </button>
        </form>
      </div>

      {/* Full Screen Image  */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgURL={fullScreeImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;
