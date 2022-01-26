
// check user is authentiacted or not
//bakend isAuthenticatedUser
const User = require('../models/user.model');
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHandler =require('../util/ErrorHandler');

exports.isAuthenticatedUser = catchAsyncErrors (async(req, res, next)=>
{
   const { token } =req.cookies;
   

   if(!token){
      return next(new ErrorHandler(" login Authentication require", 401))
   }
   const decoded =jwt.verify(token, process.env.JWT_SECRET)
   req.user = await User.findById(decoded.id)
   next()
}) 
//handling users role

exports.authorizeRoles = (...roles) => {
   return (req, res, next)=>
   {
      if(!roles.includes(req.user.role)){
        return next( new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403)
        )}
      next()

      
   }
}