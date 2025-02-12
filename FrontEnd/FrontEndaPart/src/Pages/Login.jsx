import React, { useContext, useState } from "react";
import signInLogo from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";
import Context from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate()
  const {fecthUserDetails,fetchAddToCartProduct} = useContext(Context)
  
  const [showPassword, setShowPassword] = useState(false);
  const [data,setData] = useState({
    email:"",
    password:""
  })

  const onChangeHandleer=(e)=>{
    const {name,value} = e.target
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  console.log("login data",data)
  const handleSubmit= async (e)=>{
       e.preventDefault()
       console.log("JSON data->",JSON.stringify(data))
       const responseData = await fetch(SummeryAPI.signIn.URL,{
        method:SummeryAPI.signIn.method,
        credentials:'include',
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
       })
       const dataApi= await responseData.json()
       console.log("data -api",dataApi)
       if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fecthUserDetails()
        fetchAddToCartProduct()
       }
       if(dataApi.Error){
        toast.error(dataApi.message)
       }
  }
  return (
    <section id="login">
      <div className=" mx-auto container p-4">
        <div className=" bg-white w-full p-5 max-w-sm mx-auto rounded ">
          <div className=" w-20 h-20  mx-auto">
            <img src={signInLogo} alt="login Icon" />
          </div>
          <form className=" pt-6 flex flex-col gap-2" onSubmit={handleSubmit} >
            <div className=" grid">
              <label htmlFor="">Email</label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className=" h-full w-full outline-none bg-transparent"
                  onChange={onChangeHandleer}
                  value={data.email}
                  name="email"
                
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Password</label>
              <div className=" bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="appearance-none  h-full w-full outline-none bg-transparent"
                  name="password"
                  value={data.value}
                  onChange={onChangeHandleer}
                  
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link to={'/forgot-password'} className=" block w-fit ml-auto hover:underline hover:text-red-600 " >Forgot Password</Link>
            </div>
            <button className=" bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4">
              Login
            </button>
          </form>
          <p className="my-4">Don't have account ? <Link to={'/sign-up'} className=" text-red-600 hover:text-red-700 hover:underline" >Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
