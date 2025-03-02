import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SummeryAPI } from "./Common/ApiEndPoint";
import Context from "./Context/AuthContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/UserSlice";
import "../src/App.css";

function App() {
  const [productCountCart,setProductCountCart] = useState(0);
  const dispatch = useDispatch();
  const fecthUserDetails = async () => {
    const dataResponse = await fetch(SummeryAPI.current_user.URL, {
      method: SummeryAPI.current_user.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const dataAPI = await dataResponse.json();
    console.log("userDetails",dataAPI);
    if (dataAPI.success) {
      dispatch(setUserDetails(dataAPI.data));
    }
  };

  const fetchAddToCartProduct = async () => {
    const dataResponse = await fetch(SummeryAPI.countAddToCartProductCount.URL, {
      method: SummeryAPI.countAddToCartProductCount.method,
      credentials:'include'
    });
    console.log("I am here")
    const dataRes = await dataResponse.json();
    console.log("count->>",dataRes?.data?.count)
    setProductCountCart(dataRes?.data?.count)
  };

  useEffect(() => {
    fecthUserDetails();
    fetchAddToCartProduct();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fecthUserDetails,
          productCountCart,
          fetchAddToCartProduct
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className=" min-h-[calc(100vh-100px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
