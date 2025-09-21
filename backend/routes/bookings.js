const  router  = require("express").Router()

const {create,index,getUserBookings,destroy} = require("../controllers/bookings.controller");
const adminAuth = require("../middlewares/adminAuth");
const jsonCheck = require("../middlewares/json")

router.use((req,res,next)=>{
console.log("request came to booking route");
    next()
})
router.get("/",adminAuth,index)



router.get("/me",getUserBookings)

router.delete("/:id",destroy);

router.use(jsonCheck);
router.post("/",create)
module.exports = router