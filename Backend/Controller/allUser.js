const userModel = require("../Model/userModel");

async function allUser(req,res) {
   
    
  try {
    console.log("all user req->",req.userId)
    const allUsers= await userModel.find()
    res.json({
      message:"All user",
      data: allUsers,
      success:true,
      error:false
    })
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports= allUser