import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import Image1 from "../assest/banner/img1.webp";
import Image2 from "../assest/banner/img2.webp";
import Image3 from "../assest/banner/img3.jpg";
import Image4 from "../assest/banner/img4.jpg";
import Image5 from "../assest/banner/img5.webp";

import mobileImage1 from "../assest/banner/img1_mobile.jpg";
import mobileImage2 from "../assest/banner/img2_mobile.webp";
import mobileImage3 from "../assest/banner/img3_mobile.jpg";
import mobileImage4 from "../assest/banner/img4_mobile.jpg";
import mobileImage5 from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desctopImage = [Image1, Image2, Image3, Image4, Image5];
  const mobileImage = [
    mobileImage1,
    mobileImage2,
    mobileImage3,
    mobileImage4,
    mobileImage5,
  ];
  const netxImg = () => {
    if (desctopImage.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    } else {
      setCurrentImage(0);
    }
  };

  const prevImg = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    } else {
      setCurrentImage(desctopImage.length - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desctopImage.length - 1 > currentImage) {
        console.log("page->",currentImage)
        netxImg();
      } else {
        setCurrentImage(0)
      }
    },3000);
    return ()=>clearInterval(interval);
  },[currentImage]);

  return (
    <div className=" container mx-auto px-4 rounded-md ">
      <div className="h-56 md:h-72 w-full bg-slate-300 relative">
        <div className=" h-full w-full absolute z-10 md:flex items-center hidden">
          <div className=" flex justify-between text-2xl w-full">
            <button
              onClick={prevImg}
              className=" bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={netxImg}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop and tablet vesrsion */}
        <div className=" hidden md:flex h-full w-full overflow-hidden">
          {desctopImage.map((imgUrl, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all duration-1000"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imgUrl} alt="" className=" w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* mobile vesrsion */}
        <div className=" flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((imgUrl, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full transition-all duration-1000"
                key={index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={imgUrl}
                  alt=""
                  className=" w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
