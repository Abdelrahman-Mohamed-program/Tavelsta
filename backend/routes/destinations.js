const  router  = require("express").Router()

const {index,create, update,destroy,show} = require("../controllers/destinations.controller")
const adminAuth = require("../middlewares/adminAuth")
router.use((req,res,next)=>{
console.log("request came to destinations route");
    next()
})
router.get("/",index)

router.get("/:id",show)

router.delete("/:id",adminAuth,destroy);


router.post("/add",adminAuth,create)

router.put("/update/:id",update)


module.exports = router