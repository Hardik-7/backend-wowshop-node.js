var promise = require('promise');
module.exports= func =>(req, res, next)=>
    promise.resolve(func(req, res, next))
    .catch(next)