const userModel = require("../models/user")

const emailCheck = async (req,res,next)=>{    
      if (!req.body||!req.body.email) {
      return res.status(400).json({
        method : "POST",
        error:"Bad request, EMAIL IS REQUIRED",
       })
    }
   
    if (!req.body.username) {
      return res.status(400).json({
        method : "POST",
        error:"Bad request, username IS REQUIRED",
       })
    }

    if (!req.body.password) {
        return res.status(400).json({
        method : "POST",
        error:"Bad request, password IS REQUIRED",
       })
    }

const emailExists = await userModel.exists({ email: req.body.email });
  if (emailExists) {
    return res.status(409).json({
      method: "POST",
      error: "user already registered",
    });
  }
    next()
}


module.exports = emailCheck