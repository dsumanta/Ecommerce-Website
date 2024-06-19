import { useState } from "react";
import Rule from "../Common/Rule";
import { IoClose } from "react-icons/io5";
import { SummeryAPI } from "../Common/ApiEndPoint";

function ChangrUserRule({name,email,role,onClose}) {
  const [userRule,setUserRule] = useState(role)
  const handlecChangeSelect = (e)=>{
      setUserRule(e.target.value)
      console.log(e.target.value)
  } 
  const updateUserRule = async()=> {
     const fecthResponse = await fetch(SummeryAPI.updateUser.URL,{
      method:SummeryAPI.updateUser.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        role:userRule
      })
     })
  }
  return (
    <div className=" fixed left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center">
      <div className=" w-full p-4 mx-auto bg-white shadow-md max-w-sm">
        <button className=" block ml-auto" onClick={onClose} >
          <IoClose />
        </button>
        <h1 className=" pb-4 text-lg font-medium">Change user role</h1>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <div className=" flex ">
          <p>Role: </p>
          <select className=" px-4 py-1" value={userRule} onChange={handlecChangeSelect} >
            {Object.values(Rule).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button className=" w-fit mx-auto block border py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700">
          Change Rule
        </button>
      </div>
    </div>
  );
}

export default ChangrUserRule;
