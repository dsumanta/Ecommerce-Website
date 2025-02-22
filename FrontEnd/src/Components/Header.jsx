import Logo from "../../public/logo.png";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/UserSlice";
import { useContext, useState } from "react";
import Rule from "../Common/Rule";
import Context from "../Context/AuthContext";

const Header = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
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

  return (
    <header className=" h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between ">
        <div className=" object-scale-down mix-blend-multiply">
          <Link to={"/"}>
          <img src={Logo} height={50} width={90} alt="" className=" rounded-xl" />
            {/* <Logo w={90} h={50} /> */}
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
            {user?._id && (
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setDisplayMenu((prev) => !prev)}
              >
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
            )}
            {displayMenu && (
              <div
                onClick={() => setDisplayMenu((prev) => !prev)}
                className=" absolute bottom-0 top-11 h-fit p-2 hidden md:block bg-white shadow-lg "
              >
                <nav>
                  {user?.role === Rule.ADMIN && (
                    <Link
                      to={"/admin-pannel/all-product"}
                      className=" whitespace-nowrap hover:bg-slate-100"
                    >
                      Admin Pannel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <Link to={user?._id?'/cart':'/login'} className=" text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            {user?._id && (
              <div className=" bg-red-600 text-white rounded-full w-5 h-5 p-1 flex justify-center items-center absolute -top-2 -right-2">
                <p className="text-sm">{context?.productCountCart}</p>
              </div>
            )}
          </Link>
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
