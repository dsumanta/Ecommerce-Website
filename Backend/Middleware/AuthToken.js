var jwt = require('jsonwebtoken');

async function AuthToken(req, res, next) {
  try {
  
    const token = req.cookies?.token 
    console.log("token->",token)
    if(!token){
      return res.json({
        message:"User not logged in",
        error:true,
        success:false
      })
    }
    
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      
      console.log("Decoded",decoded); 
      if(err){
        console.log("Error auth",err.message)
        throw "Session Expired"
      }
      console.log("req->"," decoded-> ",decoded._id)
      req.userId= decoded._id
      next()
    });

    console.log(token);
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: [],
      error: true,
      success: false
    });
  }
}

module.exports = AuthToken;
