const adminAuth = (req,res,next)=>{
    if (!req.user.isAdmin) {
        return res.status(403).json({
            error : "Forbidden only admin can acces this"
        })
    }
    next()
}




module.exports = adminAuth