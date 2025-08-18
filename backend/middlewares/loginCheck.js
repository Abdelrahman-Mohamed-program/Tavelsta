const userModel = require("../models/users")
const bcrypt = require("bcrypt")

const loginCheck = async (req,res,next)=>{      

try {
  
   
    if (!req.body?.email) {
      return res.status(400).json({
        method : "POST",
        error:"Bad request",
        message:"Email IS REQUIRED"
       })
    }

    if (!req.body.password) {
        return res.status(400).json({
        method : "POST",
        error:"Bad request",
        message:"password IS REQUIRED"
       })
    }


    const user = await userModel.findOne({ email: req.body.email }).select("+password");
  
    if (!user) {
    return res.status(401).json({
      method: "POST",
      error: "Unauthorized",
      message:"user is not registered"
    });
  }


  const passwordCheck = await bcrypt.compare(req.body.password,user.password)
  
  if (!passwordCheck) {
     return res.status(401).json({
      method: "POST",
      error: "Unauthorized",
      message:"Wrong passwrod"
    });
  }
  req.user = user
    next()
} catch (error) {
  next(error)
}     
}


module.exports = loginCheck