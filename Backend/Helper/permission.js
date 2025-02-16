const userModel = require("../Model/userModel")

const uploadProductPermission = async(userId)=>{
    const user = userModel.findById(userId)
    return user.role==='ADMIN'?true:false;
} 

module.exports = uploadProductPermission