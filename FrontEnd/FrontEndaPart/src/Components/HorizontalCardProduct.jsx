import React, { useEffect, useState } from "react";
import GetCatagoryWiseProduct from "../Helper/GetCatagoryWiseProduct";

const HorizontalCardProduct = ({ catagory, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const fetchData = async () => {
    setLoading(true);
    const catagoryPrudct = await GetCatagoryWiseProduct(catagory);
    setLoading(true);
    setData(catagoryPrudct.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" container mx-auto px-4 my-6">
      <h2 className=" text-2xl  font-semibold py-4">{heading}</h2>

      {data?.map((product, index) => {
        return (
          <div
            key={index}
            className=" w-full min-w-[200px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
          >
            <div className=" bg-slate-300 h-full p-2 min-w-[120px] md:min-w-[145px]">
              <img src={product.productImage[0]} alt={product.catagory} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalCardProduct;
