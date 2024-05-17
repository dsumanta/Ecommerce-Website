import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/UserSlice";
import { useState } from "react";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fectchData = await fetch(SummeryAPI.logout_user.URL, {
      method: SummeryAPI.logout_user.method,
      credentials: "include",
    });
    console.log("Log out called");
    const data = await fectchData.json();
    console.log("data->", data);
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  console.log("Header user->", user);
  return (
    <header className=" h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between ">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        <div className=" hidden  lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search product here"
            className=" w-full outline-none pl-2"
            name=""
            id=""
          />
          <div className=" text-lg min-w-[50px] h-8 flex justify-center items-center bg-red-500 rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className=" relative group flex justify-center">
            <div className="text-3xl cursor-pointer" onClick={()=>setDisplayMenu(prev=>!prev)} >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className=" w-10 h-10 rounded-full"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {displayMenu && (
              <div className=" absolute bottom-0 top-11 h-fit p-2 bg-white shadow-lg " >
                <nav>
                  <Link
                    to={"/admin-pannel"}
                    className=" whitespace-nowrap hover:bg-slate-100"
                  >
                    Admin Pannel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className=" text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className=" bg-red-600 text-white rounded-full w-5 h-5 p-1 flex justify-center items-center absolute -top-2 -right-2">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
