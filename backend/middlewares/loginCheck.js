const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const loginCheck = async (req, res, next) => {
  try {
    if (!req.body?.email) {
      return res.status(400).json({
        error: "Bad request",
        message: "Email IS REQUIRED",
      });
    }

    if (!req.body?.password) {
      return res.status(400).json({
        error: "Bad request",
        message: "password IS REQUIRED",
      });
    }
    // console.log(req.body.password);
    
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");

      if (!user) {
        return res.status(400).json({
          message:"user not found"
        })      }
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
// console.log("Came");

    if (!user || user.blocked || !passwordCheck) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginCheck;
