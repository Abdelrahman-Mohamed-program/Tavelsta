const bookingsModel = require("../models/bookings")
const create = async (req,res,next)=>{
try {
   const booking = await bookingsModel({...req.body,user:req.user.id})
   
   await booking.save()

   res.status(201).json({
      method:"POST",
      message:"New booking added"
   })
   
} catch (error) {
    next(error)
}
} 

const index = async (req,res,next)=>{
    const bookings = await bookingsModel.find();

    
    res.status(200).json({
    method:"GET",
    bookings
})
}

module.exports = {
    create,index
}