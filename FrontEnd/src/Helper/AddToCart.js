import { useContext } from "react";
import { SummeryAPI } from "../Common/ApiEndPoint";
import {toast} from "react-toastify"

const AddToCart = async (e,id)=>{
    e?.stopPropagation();
    e?.preventDefault();

    const response= await fetch(SummeryAPI.addToCart.URL,{
        method:SummeryAPI.addToCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({productId:id})
    })
    const responseData = await response.json()
    if(responseData.success){
        toast.success(responseData.message)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
}
export default AddToCart