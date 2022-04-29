//handling requests using Express
//import express using require
const express = require('express');

//executing express as a function
const app = express();

//import morgan package for login incoming requests
const morgan = require('morgan');

//import body-parser: accepts only UTF-8 encoding of the body
const bodyParser = require('body-parser');

//import Mongoose
const mongoose = require('mongoose');


//use ANY incoming requests with arrow function + .json as stringify
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works !'
//     });
// });


//------------- IMPORT ROUTES ---------------

//starting point of routes which is the previous of "router.get(./)" in products.js
const productRoutes = require('./api/routes/products');
//starting point of routes which is the previous of "router.get(./)" in orders.js
const orderRoutes = require('./api/routes/orders');
//starting point of routes which is the previous of "router.get(./)" in users.js
const userRoutes = require('./api/routes/users');



//------------- MONGOOSE CONNECTION ---------------

mongoose.connect('mongodb+srv://VTMN:30f27lqeDAeJ4bTj@node-api-ecom.u8cxa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{
    useNewUrlParser: true
}
);

//to avoid DeprecationWarning from Mongoose
mongoose.Promise = global.Promise;


//------------- PACKAGES ---------------

//using MORGAN
app.use(morgan('dev'));
//using MULTER + making upload folder publicly available
app.use('/uploads', express.static('uploads'));
//using bodyParser stringify
app.use(bodyParser.json());
//using BODY PARSER to extract body requests
app.use(bodyParser.urlencoded({ extended: true }));




//------------- HEADER SPECIFY ---------------

//append the HEADERS to any res we sent back
//allow access of any origin + which kind of headers we want to accept
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });




//------------- ROUTES which handle requests ---------------

//using a diff format of app.use with a filter as first argument
app.use('/products', productRoutes);
//we use ((req, res, next)) seq. in the appropriate folder
app.use('/orders', orderRoutes);
//we use ((req, res, next)) seq. in the appropriate folder
app.use('/users', userRoutes);




//------------- ERRORS Handlers ---------------

//handling error 404: new Error is a Node built-in
app.use((req, res, next) => {
    let error = new Error('Route not Found');
    error.status = 404;
    next(error);
})

//handling any kind of error 404 or 500
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})




module.exports = app;