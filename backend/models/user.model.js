const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const crypto= require('crypto');





const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'please Enter your name'],
        maxlength:[32, 'your name must be at least 32 characters'],

    },
    email: {
        type: String,
        required:[true,'please Enter your email'],
        unique: true,
        index:true,
        sparse: true,
        validate:[validator.isEmail, 'please Enter a valid email']
    },
   
    password:{
        type: String,
        required:[true,'please Enter your password'],
        minlength:[6, 'your name must be longer 6 characters'],
        select:false
    },
    role:{
        type: String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },


    resetPasswordToken:String,
    resetPasswordExpire:Date     


})
// Encrypting passwords before saving
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
      next()
    }
    this.password= await bcrypt.hash(this.password, 10)
})

//  comperr passwords

userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// return JWT token

userSchema.methods.getJwtToken= function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}
//reset password token for
userSchema.methods.getResetPassword= function(){ 
    //generate token for reset password
    const resetToken =  crypto.randomBytes(20).toString('hex');
    //has set  to resetPasswordToken 

    this.resetPasswordToken=crypto.cryptoHash('sha256').update(resetToken).digest('hex')
    // set tokrn expries time 
    this.resetPasswordExpire =Date.now() + 30 * 60 * 1000
    return resetToken
}



module.exports= mongoose.model('User', userSchema);