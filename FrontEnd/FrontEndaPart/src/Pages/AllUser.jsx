import { useEffect, useState } from "react";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import ChangrUserRule from "../Components/ChangrUserRule";

function AllUser() {
  const [allUser, setAllUser] = useState([]);
  const fecthAllUser = async () => {
    console.log("Fetch all user");
    const fetchData = await fetch(SummeryAPI.allUser.URL, {
      method: SummeryAPI.allUser.method,
      credentials: "include",
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }
    if (dataResponse.error) {
      toast(dataResponse.message);
    }
    console.log("all user data response", dataResponse);
  };
  useEffect(() => {
    fecthAllUser();
  }, []);
  return (
    <div>
      <table className=" w-full userTable">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=" pb-4 bg-white">
          {allUser.map((el, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el.updatedAt).format("ll")}</td>
                <td>
                  <button className=" bg-green-100 p-2 rounded-full hover:bg-green-500" >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ChangrUserRule/>
    </div>
  );
}

export default AllUser;
