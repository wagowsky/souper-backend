const jwt=require("jwtwebtoken")


const getToken=(user)=>{
    return jwt.sign(user,process.env.JWT_SECRET,{
   
expiresIn:"48"
    })
}

module.exports=getToken