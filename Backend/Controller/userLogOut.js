async function userLogout(req,res){
    try{
         res.clearCookie("token")
         res.json({
            message:"Logout successfully",
            Error:false,
            success:true,
            data:[]
         })
    }
    catch(error){
        res.json({
            message: error.message,
            Error: true,
            success: false,
        })
    }
}

module.exports = userLogout