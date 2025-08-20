
const jsonCheck = (req,res,next)=>{
    if (req.headers["content-type"]!="application/json") {
        res.set({
            Accept:"application/json"
        })
        return res.status(400).json({
            error:"bad request",
            message:"server only accepts json"
        })
    }
    next()
}

module.exports = jsonCheck