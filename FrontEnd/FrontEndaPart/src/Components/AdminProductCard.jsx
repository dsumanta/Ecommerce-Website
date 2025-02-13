import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import AdminEditProduct from "./AdminEditProduct";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div>
      <div className=" w-40">
        <div className=" w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            height={100}
            width={100}
            className=" mx-auto object-fill h-full"
            alt=""
          />
        </div>
        <h1 className=" text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className=" font-semibold">
            {DisplayINDCurrency(data.sellingPrice)}
          </p>
          <div
            onClick={() => setEditProduct(true)}
            className=" w-fit ml-auto p-2 bg-green-300 hover:bg-green-600 hover:text-white rounded-lg cursor-pointer"
          >
            <FiEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          onClose={() => setEditProduct(false)}
          EditData={data}
          FetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
