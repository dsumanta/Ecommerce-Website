const userModel = require("../../Model/userModel");

async function userDetailsController(req, res) {
  console.log("I am at userdetails");
  try {
    console.log("user Details", req.userId);
    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Details",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
