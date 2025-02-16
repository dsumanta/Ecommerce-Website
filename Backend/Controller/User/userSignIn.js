const bcrypt = require("bcrypt");
const userModel = require("../../Model/userModel");
var jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  console.log("I am at sijgnIn user");
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");
    const comparePassword = await bcrypt.compare(password, user.password);
    console.log("compare password", comparePassword);
    if (comparePassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1h",
      });

      res.cookie("token", token, tokenOption).json({
        message: "User logged in Succesfully",
        data: token,
        error: false,
        success: true,
      });
    } else {
      throw new Error("Invalid Email Or password");
    }
  } catch (error) {
    res.json({
      message: error.message,
      Error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
