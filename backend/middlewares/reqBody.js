const reqBody = (req,res,next)=>{
    if (!req.body) {
        return res.status(400).json({
            error:"Bad requsrt",
            message:"request body is required"
        })
    }
}