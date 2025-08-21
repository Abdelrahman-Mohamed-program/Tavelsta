const  router  = require("express").Router()

const {create,index,getUserBookings,destroy} = require("../controllers/bookings.controller");
const adminAuth = require("../middlewares/adminAuth");

router.use((req,res,next)=>{
console.log("request came to booking route");
    next()
})
router.get("/",adminAuth,index)

router.post("/add",create)

router.get("/me",getUserBookings)

router.delete("/delete/:id",destroy);
module.exports = router