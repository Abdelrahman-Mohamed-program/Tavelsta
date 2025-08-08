require("dotenv").config()

const express = require("express"),
  app = express(),
  port = process.env.PORT



//Routes and middleware config:






app.listen(port,(req,res)=>{
    console.log("Server is running on port " + port);
    
})

