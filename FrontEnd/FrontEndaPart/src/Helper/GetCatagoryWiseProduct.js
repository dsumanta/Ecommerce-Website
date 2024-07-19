import { SummeryAPI } from "../Common/ApiEndPoint"

const GetCatagoryWiseProduct = async(Catagory)=>{
    console.log("catagory",JSON.stringify(Catagory))
    const response =await fetch(SummeryAPI.catagoryWiseProduct.URL,{
        method:SummeryAPI.catagoryWiseProduct.method,
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({catagoty:Catagory})
    })
    const dataResponse = await response.json();
    console.log("product_catagory-wise->",dataResponse)
    return dataResponse
}
export default GetCatagoryWiseProduct