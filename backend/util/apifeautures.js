class APIFeature {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;

    }
    search(){
        // tenory operation --->   ?{ if exitst } : {}  (nothing)
        const keyword =this.queryStr.keyword ? {

            name:{
                $regex: this.queryStr.keyword,
                $options:'i' //case insensitive
            }

        } : {}
        //return query to controller
        
        this.query = this.query.find({...keyword});
        return this;
    }
    //filter by 
    filter(){


        //simple filtering
        const queryCopy = {...this.queryStr}; 
 
             //remove filed form query
        const removefields= ['keyword','limit','page'];
        removefields.forEach(e1=> delete queryCopy[e1]);


       //advanced filtering for price ratings etc
       
       let queryStr=JSON.stringify(queryCopy);// convert into string
       queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`) //remvove unwnated 




       //return query to controller
        
        this.query=this.query.find(JSON.parse(queryStr));
        return this;

    }

    //pagination

    pagination(resPerPage){
     const currentPage= Number(this.queryStr.page) || 1;
     const skip =resPerPage*(currentPage-1);


     //return query to controller
     this.query= this.query.limit(resPerPage).skip(skip);
     return this;
    }
}
module.exports = APIFeature 
