const mongoose = require("mongoose")

const destinationsSchema =  mongoose.Schema({
imgs:{
type: [{
    type: String,
    match: [/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,"invalid url"]
  }],
required:true,
 validate:{
        validator:function(value){
            if(!Array.isArray(value)||value.length<=0){
                return false
            }
            return true
        }
        ,
        message:"At least include one img"
    }
},
title:{
    type:String,
    required:true,
},
desc:{
    type:String,
    required:true,
},
pricePerNight:{
    type:Number,
    required:true,
    min:0
},
reviews: {
  type: [String],
  validate: {
    validator: function (value) {
      // If no reviews provided → that's fine (optional)
      if (!value || value.length === 0) return true;

      // Otherwise, make sure no empty strings or nulls
      return value.every(v => v && v.trim().length > 0);
    },
    message: "Reviews must not be empty or null if provided"
  }
},
type:{
    type:String,
    required:true,
    lowercase: true,
    enum:{
        values:["cultural","Historical","beach","city"],
        message:"{VALUE} is not a valid type"
    }
},
rating:{
    type:Number,
    min:0,
    max:5,
    default:0
},
travlingTips:{
    type:[String],
    required:true,
    validate:{
        validator:function(value){
            if(!Array.isArray(value)||value.length<=0){
                return false
            }
            return true
        }
        ,
        message:"At least include one travling tip"
    }
}
})
/** @type {import('mongoose').Model<any>} */

const destinationsModel = mongoose.model("Destenation",destinationsSchema);

module.exports = destinationsModel;
