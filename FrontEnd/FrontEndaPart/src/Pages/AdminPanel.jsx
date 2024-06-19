import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className=" min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className=" bg-white min-h-full w-full max-w-60 customShadow">
        <div className=" h-32 justify-center flex items-center flex-col">
          <div className="text-3xl cursor-pointer flex justify-center ">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className=" w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className=" capitalize text-lg font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>

        {/**** navigation *****/}

        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className=" px-2 py-1 hover:bg-slate-200" >All user</Link>
            <Link to={"all-product"} className=" px-2 py-1 hover:bg-slate-200" >products</Link>
          </nav>
        </div>
      </aside>
      <main className=" h-full w-full p-2">
        <Outlet/>
      </main>
    </div>
  );
}

export default AdminPanel;
