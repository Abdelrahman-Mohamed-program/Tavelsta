const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    }, 
      password:{
        type:String,
        required:true,
        select:false,
    },
    email:{
        type:String,
        required:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"invalid email format"]
    },
    blocked:{
        type:Boolean,
        default:false
    }
})

/** @type {import('mongoose').Model<any>} */
const userModel = mongoose.model("User",userSchema);

module.exports = userModel