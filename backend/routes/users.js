const router  = require("express").Router()

const {signup,login,index,getCurrentUser} = require("../controllers/users.controller")
const adminAuth =require("../middlewares/adminAuth")
router.use((req,res,next)=>{
    console.log("req cam here");
    next()
})
//sign up 
const signupCheck = require("../middlewares/signupCheck")
router.post("/signup",signupCheck,signup)

//login logic
const loginCheck = require("../middlewares/loginCheck")
router.post("/login",loginCheck,login)

//all users
router.get("/",adminAuth,index)

//one user
router.get("/currentUser",getCurrentUser)

module.exports = router