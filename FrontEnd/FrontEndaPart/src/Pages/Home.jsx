import React from "react";
import CatagoryList from "../Components/CatagoryList";
import  BannerProduct  from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CatagoryList />
      <BannerProduct />
      <HorizontalCardProduct catagory={"airpodes"} heading={"Top's Airpodes"}/>
      <VerticalCardProduct catagory={"camera"} heading={""}/>
      <VerticalCardProduct catagory={"earphone"} heading={"Wired Earphone"}/>
      <VerticalCardProduct catagory={"mobile"} heading={"Top's Mobile"}/>
      <VerticalCardProduct catagory={"watches"} heading={"Top's Watches"}/>
      <VerticalCardProduct catagory={"mouse"} heading={"Top's Mouse"}/>
      <VerticalCardProduct catagory={"printer"} heading={"Printer"}/>
      <VerticalCardProduct catagory={"proccessor"} heading={"Proccessor"}/>
      <VerticalCardProduct catagory={"refrigeretor"} heading={"Refrigeretor"}/>
      <VerticalCardProduct catagory={"speaker"} heading={"Top's Speaker"}/>
      <VerticalCardProduct catagory={"trimmer"} heading={"Top's Trimmer"}/>
      
    </div>
  );
};

export default Home;
