const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/user_model")

const authMiddleware  = async(req,res,next)=>{
   const token = req.header('Authorization');

   if(!token){
      return res.status(401).json({message:"Token not provided"})
   }
   const jwttoken = token.replace("Bearer ","")
   console.log('Token from auth middleware',jwttoken)
   try {
      const isVerified = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY)
      const userData = await User.findOne({email:isVerified.email}).select({
         password:0,
      })
      console.log(userData)

      req.user=userData;
      req.token=token;
      req.userID=userData._id;
      next();
      
   } catch (error) {
      return res.status(401).json({message:"Token not providedd"})
   }
};
module.exports=authMiddleware