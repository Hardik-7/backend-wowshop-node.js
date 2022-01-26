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
    rateing:{
        type:Number,
        default:0
       
    },
    image:[
        {
            publi_id:{
                type:String,
                required:true,

            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    catagory:{
        type:String,
        required:[true, 'please select category for this product'],
        enum:{
            values: [
                'Electronics',
                'phone',
                'Laptop',
                'books',
                'clothes',
                'homeapplicance',
                'outdoor'
        ],
         message:'please enter category for product'
        }



        
    },
    seller:{
        type:String,
        required:[true, 'please enter product seller']
    },
    stock:{
        type:Number,
        required:[true, 'please enter product stock'],
        default:0,
        maxLenght:[5,'stock cannot exceed 5 character']
    },
    numofReviesws:{
        type:Number,
        default:0,
    },
    reviews:
    [{
        name:{
            type:String,
            required:true,

        },
        rating:{
            type:Number,
            required:true,
        
        },
        comments:{
            type:String,
            required:true,

        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true


    },
    creatTime:{
        type:Date,
        default:Date.now
         
    }


})
module.exports=mongoose.model('Product', productSchema)