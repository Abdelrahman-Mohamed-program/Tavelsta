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
    try {
        
     
  const bookings = await bookingsModel.find()
  .populate("user", "email")             
  .populate("destination", "title");   

    res.status(200).json({
    method:"GET",
    bookings
})
    }catch (error) {
        next(error)
    }
}

const getUserBookings = async(req,res,next)=>{
const userId = req.user.id; // or wherever you get the userId
try {
    const bookings = await bookingsModel.find({ user: userId }).populate("destination", "_id");   
res.status(200).json({
      method:"GET",
      bookings
})
} catch (error) {
    next(error)
}

}

module.exports = {
    create,index,getUserBookings
}