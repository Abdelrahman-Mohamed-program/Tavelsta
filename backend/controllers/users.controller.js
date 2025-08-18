/** @type {import('mongoose').Model<any>} */
const userModel = require("../models/users")
const genearteToken = require("../config/generateToken")
const bcrypt = require("bcrypt")

const  signup = async (req,res,next)=>{ 
const hashedPassword =  await bcrypt.hash(req.body.password,10)
 try {
 const newUser =  new userModel({
    username:req.body.username,
    email : req.body.email,
    password : hashedPassword
 })

await newUser.save();

res.status(201).json({
    method:"POST"
    ,message:"User created succesfully"
})
    } catch (error) {
        if (error.name=="ValidationError") {
            error.status = 400
        }
        next(error)
    }
}


const login = (req,res,next)=>{
 try {
   const accessToken = genearteToken(req.user);
   res.status(200).json(
    {
     accessToken
    }
   )
 } catch (error) {
    next(error)
 }
}

const index = async (req,res,next)=>{
    try {
         const users = await userModel.find()

 res.status(200).json({
    method:"GET",
    data: users
 })
    } catch (error) {
        next(error)
    }

}

const getCurrentUser = async (req,res,next)=>{
    try {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        method:"GET",
        message:"User found",
        data:{
            id:user.id,
            username:user.username,
            bookings:user.bookings
        }
    })
    } catch (error) {
        next(error)
    }
}

const blockUser = async (req,res,next)=>{
    try {
    if (!isValidObjectId(req.params.id)||req.params.id==req.user.id) {
      return res.status(400).json({
        method:"PATCH",
        error:"Bad request, invalid id"
       })   
    }
   

    const user =  await userModel.findByIdAndUpdate(req.params.id,{blocked:true})

    if (!user) {
       return res.status(400).json({
        method:"PATCH",
        error:"Bad request, user is not found"
        })
    }

    res.status(200).json({
       method:"PATCH",
       message:"user blocked successfuly"
    })
    }
    catch (error) {
        next(error)
    }
}

const unblockUser = async (req,res,next)=>{
    try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        method:"PATCH",
        error:"Bad request, invalid id"
       })   
    }

 const user =  await userModel.findByIdAndUpdate(req.params.id,{blocked:false})

    if (!user) {
       return res.status(400).json({
        method:"PATCH",
        error:"Bad request, user is not found"
        })
    }

    res.status(200).json({
       method:"PATCH",
       message:"user unblocked successfuly"
    })
    }
    catch (error) {
        next(error)
    }
}

const changePassword = async (req,res,next)=>{
try {
    
    if (!req.body?.currentPassword||!req.body.newPassword) {
      return  res.status(400).json({
         method:"PATCH",
         error:"Bad request",
         message:"Current and new Password are required"
        })
    }
    const user = await userModel.findById(req.user.id);
    const passwordCheck = await bcrypt.compare(req.body.currentPassword,user.password);
    
   if (!passwordCheck) {
    return res.status(403).json({
      method: "PATCH",
      error: "Forbidden",
      message:"Old password is incorrect"
    });
     }
     const hashedPassword = await bcrypt.hash(req.body.newPassword,10) 
    await userModel.findByIdAndUpdate(req.user.id,{
        password:hashedPassword
     })
     
    res.status(200).json({
         method: "PATCH",
         message:"password updated succesfully"
    })

} catch (error) {
    next(error)
}
}

const update = async (req,res,next)=>{
try {

    if (req.body?.password||req.body.blocked) {
      return  res.status(403).json({
            error:"forbidden",
            message:"Cannot change these data"
        })
    }

    const user = await userModel.findByIdAndUpdate(req.user.id,req.body,{
        runValidators: true 
    });

     
    res.status(200).json({
         method: "PATCH",
         message:"user updated succesfully"
    })

} catch (error) {
    next(error)
}
}



module.exports = { 
    signup,login,index,getCurrentUser,blockUser,unblockUser,changePassword,update
}