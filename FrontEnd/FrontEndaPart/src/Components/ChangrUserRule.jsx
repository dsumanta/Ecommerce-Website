import { useState } from "react";
import Rule from "../Common/Rule";
import { IoClose } from "react-icons/io5";
import { SummeryAPI } from "../Common/ApiEndPoint";
import { toast } from "react-toastify";

function ChangrUserRule({ name, email, role,userId, onClose,callFunction }) {
  const [userRule, setUserRule] = useState(role);
  const handlecChangeSelect = (e) => {
    setUserRule(e.target.value);
    console.log(e.target.value);
  };
  const updateUserRule = async () => {
    const fecthResponse = await fetch(SummeryAPI.updateUser.URL, {
      method: SummeryAPI.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId:userId,
        role: userRule
      }),
    });
    const responseData = await fecthResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunction()
    }
    console.log("upadated Ruke", responseData);
  };
  return (
    <div className=" fixed left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className=" w-full p-4 mx-auto bg-white shadow-md max-w-sm">
        <button className=" block ml-auto" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className=" pb-4 text-lg font-medium">Change user role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className=" flex ">
          <p>Role: </p>
          <select
            className=" px-4 py-1"
            value={userRule}
            onChange={handlecChangeSelect}
          >
            {Object.values(Rule).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={updateUserRule} className=" w-fit mx-auto block border py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700">
          Change Rule
        </button>
      </div>
    </div>
  );
}

export default ChangrUserRule;
