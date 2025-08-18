const userModel = require("../models/users")

const emailCheck = async (req,res,next)=>{    
      if (!req.body?.email) {
      return res.status(400).json({
        method : "POST",
        error:"Bad request",
        message:"EMAIL IS REQUIRED"
       })
    }

    if (!req.body.password) {
        return res.status(400).json({
        method : "POST",
        error:"Bad request",
        message:"password IS REQUIRED"
       })
    }

const emailExists = await userModel.exists({ email: req.body.email });
  if (emailExists) {
    return res.status(409).json({
      method: "POST",
      error: "Conflict",
      message:"user already registered"
    });
  }
    next()
}


module.exports = emailCheck