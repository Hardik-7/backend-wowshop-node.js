const Product=require('../models/product.modeldum');
const ErrorHandler = require('../util/ErrorHandler');
const catchAsyncErrors =require('../middlewares/catchAsyncErrors');
const APIFeatures= require('../util/apifeautures');


//   create new product api => /api/v1/admin/product/new

 
exports.newProduct =catchAsyncErrors (async (req, res, next)=>{

    // add user id in product
      req.body.user= req.user.id;
     // 
      const product = await Product.create(req.body);  
      res.status(201).json({ 
          success: true, 
          product
      })

})


// get all products => /api/v1/products
exports.getProducts=catchAsyncErrors( async(req,res, next)=>
{

    const resPerPage =4;
    //const productCount= await Product.CountDocuments();
    const apifeatures= new APIFeatures(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products = await apifeatures.query;
     
    res.status(200).json({
        success:true,
        count:products.length,
        products
        
    })
})
// get single product => /api/v1/product/:id

exports.getsingleProduct=catchAsyncErrors (async(req, res, next)=>{
   const product = await Product.findById(req.params.id);
   if(!product){
       return next(new ErrorHandler(' Product not found', 404));
   }
   res.status(200).json({
       sucess: true,
       product
   })
})
// update products => /api/v1/product/:id

exports.updateProduct= catchAsyncErrors (async(req, res, next)=>{
  let product = await Product.findById(req.params.id);
   if(!product){
       return res.status(404).json({
           success:false,
           message: 'Product not found'
       })
   }
   product=await Product.findByIdAndUpdate(req.params.id, req.body,
    {
       new: true,
       runValidators: true,
       useFindAndModify:false
   });
   res.status(200).json({
       success:true,
       product
    })
   
})

// delete product = /api/v1/admin/product/:id
exports.deleteProduct =catchAsyncErrors( async (req, res, next)=> {
     const product = await Product.findById(req.params.id);
     if(!product) {
         return res.status(404).json({
             sucess:false,
             message: 'Product not found'
         });
         
     }
     await product.remove();
     res.status(200).json({
         sucess:true,
         message: 'Product deleted successfully'

        


     });
    })
    