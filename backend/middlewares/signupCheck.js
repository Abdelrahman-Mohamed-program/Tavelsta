const userModel = require("../models/users");

const emailCheck = async (req, res, next) => {
  if (!req.body?.email) {
    return res.status(400).json({
      error: "Bad request",
      message: "Email IS REQUIRED",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      error: "Bad request",
      message: "Password IS REQUIRED",
    });
  }

  const emailExists = await userModel.exists({ email: req.body.email });
  if (emailExists) {
    return res.status(409).json({
      error: "Conflict",
      message: "Invalid credentials",
    });
  }
  next();
};

module.exports = emailCheck;
