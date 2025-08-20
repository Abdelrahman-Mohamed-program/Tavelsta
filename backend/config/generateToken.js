const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET

function genearteToken (user){
    let isAdmin = false
    try{
    if (user.email==="admin@gmail.com") {
        isAdmin = true
    }
   console.log("id :" + user._id);
   
    const payload = {
        id:user._id,
        username :user.username,
        isAdmin,
    }

    const token =  jwt.sign(payload,secret,{
        expiresIn:"30d"
    })
    return token
}catch(err){
console.log(err);
}
}

module.exports = genearteToken