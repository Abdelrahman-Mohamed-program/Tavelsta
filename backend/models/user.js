const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        default:null,
        required:true,
    }, 
      password:{
        type:String,
        default:null,
        required:true,
    },
    email:{
        type:String,
        default:null,
        required:true,
    },
    bookings:{
        type:Object,
        default:null
    }
})

/** @type {import('mongoose').Model<any>} */
const userModel = mongoose.model("User",userSchema);

module.exports = userModel