require("dotenv").config()

//dependencies and modules
const express = require("express"),
  app = express(),
  port = process.env.PORT;


const {notFound,errorHandler} = require("./middlewares/errorHandle"),
  {dbConnection} = require("./config/db")    


//Routes, middlewares and config:

dbConnection();


app.use(notFound);

app.use(errorHandler)






app.listen(port,(req,res)=>{
    console.log("Server is running on port " + port);
    
})

