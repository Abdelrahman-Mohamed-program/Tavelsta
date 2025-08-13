const jwt = require('jsonwebtoken');
const secret = process.env.TOKEN_SECRET

function genearteToken (user){
    let isAdmin = false
    try{
    if (user.email==="admin@gmail.com") {
        isAdmin = true
    }
   
    const payload = {
        id:user._id,
        username :user.username,
        isAdmin,
    }
     //use sign to create new token
    const token =  jwt.sign(payload,secret,{
        expiresIn:"1m"
    })
    return token
}catch(err){
console.log(err);
}
}

module.exports = genearteToken