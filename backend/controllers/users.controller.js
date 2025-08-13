/** @type {import('mongoose').Model<any>} */
const userModel = require("../models/user")
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
        next(error)
    }
}


const login = (req,res)=>{
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

const index = async (req,res)=>{
 const users = await userModel.find()

 res.status(200).json({
    method:"GET",
    data: users
 })
}



module.exports = { 
    signup,login,index
}