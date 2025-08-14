const mongoose = require("mongoose")

const destenationsSchema =  mongoose.Schema({
imgs:{
type:Array,
required:true,
default:[]
},
title:{
    type:String,
    required:true,
    default:null
},
desc:{
    type:String,
    required:true,
    default:null
},
pricePerNight:{
    type:Number,
    required:true,
    default:0
},
reviews:{
    type:Array,
    required:true,
    default:[]
},
type:{
    type:String,
    required:true,
    default:null
},
rating:{
    type:Number,
    required:true,
    default:0
},
travlingTips:{
    type:Array,
    required:true,
    default:[]
}
})

const destenationsModel = mongoose.model("Destenation",destenationsSchema);

module.exports = destenationsModel;
