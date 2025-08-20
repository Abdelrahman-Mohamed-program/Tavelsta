const  router  = require("express").Router()

const {index,create, edit,destroy,show} = require("../controllers/destinations.controller")

const jsonCheck = require("../middlewares/json")
router.use((req,res,next)=>{
console.log("request came to destinations route");
    next()
})
router.get("/",index)

router.get("/:id",show)

router.delete("/delete/:id",destroy);

router.use(jsonCheck);

router.post("/add",create)

router.put("/update/:id",edit)


module.exports = router