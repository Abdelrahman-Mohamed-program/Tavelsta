function dbConnection(){

const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL)


const db = mongoose.connection

db.once("open",()=>{
    console.log("DB connected successfly");
})

db.on("error",()=>{
    console.error("faild to connect with DB");
})
}



module.exports = {dbConnection}