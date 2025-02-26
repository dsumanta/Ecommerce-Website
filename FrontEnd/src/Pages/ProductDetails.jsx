import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";
import VerticalCardProduct from "../Components/VerticalCardProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import CatagoryWiseProductDisplay from "../Components/CatagoryWiseProductDisplay";
import AddToCart from "../Helper/AddToCart";
import Context from "../Context/AuthContext";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    catagory: "",
    productImage: [],
    desription: "",
    price: "",
    sellingPrice: "",
  });
  const [loading, setLoading] = useState(true);
  const productImageList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const {fetchAddToCartProduct} = useContext(Context)
  const param = useParams();
  const fetchDetails = async () => {
    setLoading(true);
    const response = await fetch(SummeryAPI.productdetails.URL, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: param.id,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
    setLoading(false);
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  const handleAddToCart = async (e,id)=>{
    await AddToCart(e,id)
    fetchAddToCartProduct()
  }
  const handleMouseEnter = (imgURL) => {
    setActiveImage(imgURL);
  };
  const handleZoom = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCordinate]
  );
  const handleMouseLeaveImage = () => {
    setZoomImage(false);
  };
  return (
    <div className=" container mx-auto p-4">
      <div className=" min-h-[100px] flex flex-col lg:flex-row gap-4">
        {/* product Image */} 
        <div className=" h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className=" w-[300px] h-[300px] lg:h-96 lg:w-96 bg-slate-300 relative ">
            <img
              src={activeImage}
              className=" w-full h-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoom}
              onMouseLeave={handleMouseLeaveImage}
            />
            {zoomImage && (
              <div className=" hidden lg:block absolute min-h-[400px] min-w-[400px] bg-slate-200 p-1 -right-[410px] top-0 overflow-hidden">
                <div
                  className=" h-full w-full min-w-[400px] min-h-[400px] bg-slate-300 mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCordinate.x * 100}% ${
                      zoomImageCordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className=" h-full">
            {loading ? (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scroll-bar h-full">
                {productImageList.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className=" w-20 h-20 bg-slate-300 rounded animate-pulse"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scroll-bar h-full">
                {data.productImage.map((imageUrl, index) => {
                  return (
                    <div
                      key={index}
                      className=" w-20 h-20 bg-slate-300 rounded"
                    >
                      <img
                        src={imageUrl}
                        className=" w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        alt=""
                        onMouseEnter={() => handleMouseEnter(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product Details */}
        <div className=" flex flex-col gap-3">
          <p className=" bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {data.brandName}
          </p>
          <h2 className=" text-2xl lg:text-3xl font-semibold ">
            {data.productName}
          </h2>
          <p className=" capitalize text-slate-500 ">{data.catagory}</p>
          <div className=" flex gap-2 text-red-600">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <div className=" flex items-center gap-2 text-2xl lg:text-3xl font-medium ">
            <div className=" text-red-600">
              {DisplayINDCurrency(data?.sellingPrice)}
            </div>
            <div className=" text-slate-500 line-through">
              {DisplayINDCurrency(data?.price)}
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <button className=" rounded border-2 border-red-600 px-3 py-1 min-w-[100px] font-medium text-red-600 hover:bg-red-600 hover:text-white">
              Buy
            </button>
            <button onClick={(e)=>handleAddToCart(e,data._id)} className=" rounded border-2 border-red-600 px-3 py-1 min-w-[100px] font-medium text-red-600 hover:bg-red-600 hover:text-white">
              Add To Cart
            </button>
          </div>
          <div>
            <p className=" text-slate-500 my-1 font-medium">Desription:</p>
            <p>{data?.desription}</p>
          </div>
        </div>
      </div>
      {data.catagory && (
        <CatagoryWiseProductDisplay
          catagory={data.catagory}
          heading={"Simillar product"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
