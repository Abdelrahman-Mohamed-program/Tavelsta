const  router  = require("express").Router()

const {index,create, edit,destroy,show} = require("../controllers/destenations.controller")

router.use((req,res,next)=>{
console.log("request came to destenations route");


    next()
})
router.get("/",index)

router.post("/add",create)

router.put("/update/:id",edit)

router.get("/:id",show)

router.delete("/delete/:id",destroy);
module.exports = router