const app = require('./app');
const connectDB= require('./config/database');

const dotenv = require('dotenv');

//handle uncaught exceptions

//setting up config file

dotenv.config({ path: 'backend/config/config.env' })

//database connection
connectDB();

//server connection

const server = app.listen(process.env.PORT, () => {
    console.log (`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
}) 
// handle unhandal promise


      
