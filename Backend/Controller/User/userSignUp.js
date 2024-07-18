const userModel = require("../../Model/userModel");

const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User alredy exist");
    }

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!hashedPassword) throw new Error("Something went wrong");
    console.log(hashedPassword);
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashedPassword,
    };

    const userData = new userModel(payload);
    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "user created succefully",
    });
  } catch (error) {
    res.json({
      message: error.message,
      Error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
