import React from "react";
import CatagoryList from "../Components/CatagoryList";
import  BannerProduct  from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";

const Home = () => {
  return (
    <div>
      <CatagoryList />
      <BannerProduct />
      <HorizontalCardProduct catagory={"airpodes"} heading={"Top's Airpodes"}/>
    </div>
  );
};

export default Home;
