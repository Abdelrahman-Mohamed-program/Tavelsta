const router  = require("express").Router()
const jsonCheck = require("../middlewares/json")
const {signup,login,index,getCurrentUser,blockUser,unblockUser,changePassword,update} = require("../controllers/users.controller")
const adminAuth =require("../middlewares/adminAuth")
router.use((req,res,next)=>{
    console.log("req cam here");
    next()
})

//all users
router.get("/",adminAuth,index)

//one user
router.get("/me",getCurrentUser)

router.use(jsonCheck);
//sign up 
const signupCheck = require("../middlewares/signupCheck")
router.post("/signup",signupCheck,signup)

//login logic
const loginCheck = require("../middlewares/loginCheck")
router.post("/login",loginCheck,login)

//update password 
router.patch("/me/changePassword",changePassword)

//update user data (email and username)
router.put("/me",update)
//block and unblock user
router.patch("/block/:id",adminAuth,blockUser)
router.patch("/unblock/:id",adminAuth,unblockUser)



module.exports = router