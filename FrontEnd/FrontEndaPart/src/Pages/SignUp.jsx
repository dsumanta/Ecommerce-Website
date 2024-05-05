import React, { useState } from "react";
import signInLogo from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageTobase64 from "../Helper/ImageToBase64";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const onChangeHandleer = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log("login data", data);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageTobase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };
  return (
    <section id="signUp">
      <div className=" mx-auto container p-4">
        <div className=" bg-white w-full p-5 max-w-sm mx-auto rounded ">
          <div className=" w-20 h-20  mx-auto rounded-full relative overflow-hidden">
            <div>
              <img src={data.profilePic ||signInLogo} alt="login Icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Image
                </div>
                <input
                  type="file"
                  onChange={handleUploadPic}
                  className=" hidden"
                />
              </label>
            </form>
          </div>
          <form className=" pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className=" grid">
              <label htmlFor=""> Name :</label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className=" h-full w-full outline-none bg-transparent"
                  onChange={onChangeHandleer}
                  value={data.name}
                  name="name"
                />
              </div>
            </div>
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
                  value={data.password}
                  onChange={onChangeHandleer}
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="">Confirm Password</label>
              <div className=" bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="appearance-none  h-full w-full outline-none bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={onChangeHandleer}
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className=" bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4">
              Sign Up
            </button>
          </form>
          <p className="my-4">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
