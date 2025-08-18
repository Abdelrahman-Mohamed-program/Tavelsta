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
});

//handling preflight requests
if (req.method=="OPTIONS") {
  res.set({
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*"
  })
  return res.sendStatus(204);
}
  
  next()
})

app.use(express.json());
app.use(tokenAuth);

const usersRouter = require("./routes/users")
const destenationsRouter = require("./routes/destenations")

app.use("/api/v1/destenations",destenationsRouter);
app.use("/api/v1/users",usersRouter);
// http://localhost:2005/api/v1/





app.use(notFound);
app.use(errorHandler)






app.listen(port,(req,res)=>{
    console.log("Server is running on port " + port);
    
})

