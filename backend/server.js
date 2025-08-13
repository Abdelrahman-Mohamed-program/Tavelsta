require("dotenv").config()

//dependencies and modules
const express = require("express"),
  app = express(),
  port = process.env.PORT;

const tokenAuth = require("./middlewares/tokenAuth")  
const {notFound,errorHandler} = require("./middlewares/errorHandle")

//database config:
const {dbConnection} = require("./config/db")    
dbConnection();

//Routes, middlewares and config:
app.use((req,res,next)=>{
res.set({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*"
});

if (req.method=="OPTIONS") {
  return res.sendStatus(204);
}
  
  next()
})
app.use(express.json());
app.use(tokenAuth);

const userRouter = require("./routes/users")
app.use("/api/v1/users",userRouter);




app.use(notFound);
app.use(errorHandler)






app.listen(port,(req,res)=>{
    console.log("Server is running on port " + port);
    
})

