const userModel = require("../../Model/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, name, email, role } = req.body;
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await userModel.findById(sessionUser);
    console.log("user->", userId);
    const updateUserById = await userModel.findByIdAndUpdate(userId, payload);

    res.json({
      data: updateUserById,
      message: "User updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
