const ImageUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadedImage = async (image)=>{
    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset',"mern_product")
    const dataResponse = await fetch(ImageUrl,{
        method:'post',
        body: formData
    })
    
    return dataResponse.json()
}
export default uploadedImage