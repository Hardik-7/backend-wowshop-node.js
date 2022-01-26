const User = require('../models/user.model');
const ErrorHandler = require('../util/ErrorHandler');
const catchAsyncErrors =require('../middlewares/catchAsyncErrors');
const sendToken = require('../util/jwtToken');
const sendEmail= require('../util/sendEmail')

// Create user => api/v1/register

exports.registerUser= catchAsyncErrors( async (req, res, next) => {
    const{name, email, password } = req.body;
    const user= await User.create({
        name,
        email,
        password,
    })
    // cookies
    sendToken(user, 200, res)

// without cookies
    


    
})
// login success => /api/v1/login

exports.loginUser =catchAsyncErrors( async(req, res, next) => {
    const{email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('please enter email & password', 400));
    }


    //findin user database 
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('invaild  email or password', 401));

    }
    // check if password is correct or not

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        return next(new ErrorHandler('Invaild  email or password', 401))
    }
  
    // cookies 

   sendToken(user, 200, res)

    // without coookies
    

}

)
//get current loged in user
// forget passwords => /api/v1/password/forget
exports.forgotPassword = catchAsyncErrors( async (req, res, next) => {
    const user= await User.findOne({
        email: req.body.email,
    });
    if(!user){

    return next(new ErrorHandler('user not found', 404));
    }
    //get reset token

    const resetToken = await getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    //create reset password url

    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

const message=`Your password reset token is follow: \n\n${resetUrl}\n\nIf you have not reqseted this eamil, then ignore it`
try {

    await sendEmail({
        eamil:user.email,
        subject:'wowshop password reset',
        message
    })
    res.status(200).json({
        success:true,
        message:`Email sent to ${user.eamil}`
    })
    
} catch (error) {
    user.resetPasswordToken=Undefinded;
    user.resetPasswordExpire=Undefinded;
    await user.save({validateBeforeSave :false});
    return next(new ErrorHandler(error.message, 500))
    
}
})

// logout user  => api/v1/logout

 exports.logout = catchAsyncErrors( async (req, res, next) => {
     res.cookie('token',null,{
         expires: new Date(Date.now()),
         httpOnly: true
     })

         res.status(200).json({
             success: true,
             message: 'logout successful'
         })
 }) 

 