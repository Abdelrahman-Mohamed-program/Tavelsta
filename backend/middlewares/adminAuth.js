const adminAuth = (req,res,next)=>{
    if (!req.user.isAdmin) {
        return res.status(403).json({
            error : "Forbidden"
            ,message:"only admin can access this"
        })
    }
    next()
}




module.exports = adminAuth