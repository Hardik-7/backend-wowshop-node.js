const ErrorHandler = require('../util/ErrorHandler');
module.exports=(err, req, res, next)=>{
    err.status = err.statusCode || 500;

    
   if (process.env.NODE_ENV !== 'PRODUCTION'){
       let err={...err}
       error.message=err.message;

     // wrong moonges objectg 
       if(err.name === 'CastError'){
           const message=`Resource not found. Invalid ${err.path}`
           error =new ErrorHandler(message,400)
    }
    ///handleing validation error
    if(err.name === 'ValidationError'){
        const message= Object.values(err.value).map(value =>value.message)
        error =new ErrorHandler(message,400)


    //handle moonges duplicate errors
    if(err.code === 11000){
        const message = `Dupilcate ${object.keys(err.keyvalue)} entered`
        error =new ErrorHandler(message,400)
    }


    //handldilg wrong jwt error
    if(err.code === 'jsonWebTokenError'){
        const message = `json web token is invalid try agin`
        error =new ErrorHandler(message,400)
    }
    //handldilg wrong jwt error
    if(err.code === 'TokenExpiredToken'){
        const message = `json web token is exprire try agin`
        error =new ErrorHandler(message,400)
    }

 }

   
    res.status(err.statusCode).json({
        sucess: false,
        error: err.message || 'internal error'

     
    })
}
}