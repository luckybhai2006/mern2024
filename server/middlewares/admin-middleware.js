const adminMiddleware = async(req, res, next)=>{
try {
   // console.log(req.user)
   const adminRole = req.user.isAdmin;
   if(!adminRole){
      return res.status(403).json({msg:"Access denied. User is npt a admin"})
   }
   // res.status(200).json({msg:req.user.isAdmin})



   // Next is used to move forward if we not use next then it stuck on aminMiddleware
   next();
} catch (error) {
   next(error)
} 
}
module.exports = adminMiddleware;