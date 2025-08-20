const mongoose = require("mongoose");

const bookingsSchema =  mongoose.Schema({
   destination:{
    type:mongoose.Types.ObjectId,
    ref:"Destination",
    required:true},
   user:{
    type:mongoose.Types.ObjectId,
    ref:"USER",
    required:true
   },
     bookingDate:{
    type:Date,
    required:true
     },
     details:{
        nights:{
            type:Number,
            required:true},
        persons:{
            type:Number,
            required:true},
        totalPrice:{
            type:Number,
            required:true}
     },
     approved:{
        type:Boolean,
        default:false
     }
})
/** @type {import('mongoose').Model<any>} */

const bookingsModel = mongoose.model("Booking",bookingsSchema);

module.exports = bookingsModel;
