const userModel = require("../models/user")
const bcrypt = require("bcrypt")

const loginCheck = async (req,res,next)=>{      
  console.log("came here");
  
      if (!req.body.email) {
      return res.status(400).json({
        method : "GET",
        error:"Bad request, EMAIL IS REQUIRED",
       })
    }

    if (!req.body.password) {
        return res.status(400).json({
        method : "GET",
        error:"Bad request, password IS REQUIRED",
       })
    }

const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      method: "GET",
      error: "Unauthorized, user is not registered",
    });
  }

  const passwordCheck = await bcrypt.compare(req.body.password,user.password)
  
  if (!passwordCheck) {
     return res.status(401).json({
      method: "GET",
      error: "Unauthorized, Wrong passwrod",
    });
  }
  req.user = user
    next()
}


module.exports = loginCheck