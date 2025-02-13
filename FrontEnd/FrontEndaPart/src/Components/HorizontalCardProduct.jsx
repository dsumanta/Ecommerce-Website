import React, { useContext, useEffect, useRef, useState } from "react";
import GetCatagoryWiseProduct from "../Helper/GetCatagoryWiseProduct";
import DisplayINDCurrency from "../Helper/DisplayINDCurrency";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddToCart from "../Helper/AddToCart";
import Context from "../Context/AuthContext";

const HorizontalCardProduct = ({ catagory, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const [scroll,setScroll] = useState(0);
  const {fetchAddToCartProduct} = useContext(Context)
  const scrollElement = useRef();
  const fetchData = async () => {
    setLoading(true);
    const catagoryPrudct = await GetCatagoryWiseProduct(catagory);
    setLoading(true);
    setData(catagoryPrudct.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight= ()=>{
    scrollElement.current.scrollLeft +=300
  }
  const scrollLeft = ()=>{
    scrollElement.current.scrollLeft -= 300
  }
  const handleAddToCart = async(e,id)=>{
    await AddToCart(e,id);
    fetchAddToCartProduct()
  }
  return (
    <div className=" container mx-auto px-4 my-6 relative">
      <h2 className=" text-2xl  font-semibold py-4">{heading}</h2>
      <div className=" flex items-center gap-4 md:gap-6 overflow-scroll scroll-bar transition-all" ref={scrollElement} >
        <button className=" bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block" onClick={scrollLeft}> <FaAngleLeft /></button>
        <button className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block" onClick={scrollRight}><FaAngleRight /></button>
        {data?.map((product, index) => {
          return (
            <Link 
              to={"product/"+product?._id}
              key={index}
              className=" w-full min-w-[280px] md:min-w-[320px] max-w-[200px] md:max-w-[320px] h-36 bg-white rounded-md shadow flex"
            >
              <div className=" bg-slate-300 h-full p-2 min-w-[120px] md:min-w-[145px]">
                <img
                  src={product.productImage[0]}
                  alt={product.catagory}
                  className=" object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply"
                />
              </div>
              <div className=" p-4 grid">
                <h2 className=" font-semibold text-base md:text-lg text-ellipsis line-clamp-1">
                  {product?.productName}
                </h2>
                <h2 className=" capitalize">{product?.catagory}</h2>
                <div className=" flex gap-3">
                  <p className=" text-red-600 font-medium">
                    {DisplayINDCurrency(product.sellingPrice)}
                  </p>
                  <p className=" text-slate-500 line-through">
                    {DisplayINDCurrency(product.price)}
                  </p>
                </div>
                <button onClick={(e)=>handleAddToCart(e,product?._id)} className=" text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">
                  Add To Cart
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
