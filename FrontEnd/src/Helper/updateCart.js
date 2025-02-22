
import { SummeryAPI } from "../Common/ApiEndPoint";
import {toast} from "react-toastify"

const updateCart = async (product)=>{
    console.log("cartProduct ",product)
    const response= await fetch(SummeryAPI.updateCart.URL,{
        method:SummeryAPI.updateCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({productId:product.productId,quantity:product.quantity})
    })
    const responseData = await response.json()
    if(responseData.success){
        console.log(responseData)
    }
    if(responseData.error){
        toast.error(responseData.message)
    }
}
export default updateCart