const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please enter product name'],
        trim:true,
        maxLenght:[100, 'product name cannot exceed 100 character']
         
    },
    price:{
        type:Number,
        required:[true, 'please enter product price'],
        
        maxLenght:[5, 'product price cannot exceed 5 character'], 
        default:0.0
         
    },
    decscription:{
        type:String,
        required:[true, 'please enter product decscription'],
        
        
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true


    },
});
module.exports = mongoose.model("product",productSchema)