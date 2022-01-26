const express = require('express');
const app = express();


const cookieParser = require('cookie-parser')
const ErrorMidleware = require('./middlewares/errors')
 
app.use(express.json());
app.use(cookieParser());

// import all routes

const products=require('./routes/product');
const auth=require('./routes/auth');

//api routes => /api/v1

app.use('/api/v1', products);
app.use('/api/v1', auth);
 

module.exports = app ;
                                               