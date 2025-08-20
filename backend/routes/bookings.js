const  router  = require("express").Router()

const {create,index} = require("../controllers/bookings.controller")

router.use((req,res,next)=>{
console.log("request came to booking route");
    next()
})
router.get("/",index)

router.post("/add",create)

// router.put("/update/:id",edit)

// router.get("/:id",show)

// router.delete("/delete/:id",destroy);
module.exports = router