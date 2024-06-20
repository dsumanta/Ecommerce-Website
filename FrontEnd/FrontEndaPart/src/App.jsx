import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SummeryAPI } from "./Common/ApiEndPoint";
import Context from "./Context/AuthContext";
import {useDispatch} from 'react-redux'
import { setUserDetails } from "./store/UserSlice";
import '../src/App.css'

function App() {
  const dispatch = useDispatch();
  const fecthUserDetails= async ()=>{
    const dataResponse = await fetch(SummeryAPI.current_user.URL,{
      method:SummeryAPI.current_user.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
    })
    const dataAPI = await dataResponse.json();
    console.log(dataAPI)
    if(dataAPI.success){
      dispatch(setUserDetails(dataAPI.data))
    }
  }

  useEffect(()=>{
    fecthUserDetails()
  },[])

  return (
    <>
      <Context.Provider value={{
        fecthUserDetails
      }} >
      <ToastContainer />
      <Header />
      <main className=" min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
