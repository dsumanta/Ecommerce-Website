import React from "react";
import { IoClose } from "react-icons/io5";
const DisplayImage = ({ imgURL, onClose }) => {
  return (
    <div className=" fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center">
      <div className=" bg-white shadow-lg max-w-5xl mx-auto p-4">
        <div
          className=" w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoClose />
        </div>

        <div className=" flex justify-center max-h-[80vh] max-w-[80vh]">
          <img src={imgURL} className="w-full h-full p-4" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
