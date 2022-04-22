//handling requests using Express
//import express using require
const express = require('express');

//import morgan package for login incoming requests
const morgan = require('morgan');

//import body-parser: accepts only UTF-8 encoding of the body
const bodyParser = require('body-parser');

//executing express as a function
const app = express();


//use ANY incoming requests with arrow function + .json as stringify
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works !'
//     });
// });

//starting point of routes which is the previous of "router.get(./)" in products.js
const productRoutes = require('./api/routes/products');
//starting point of routes which is the previous of "router.get(./)" in orders.js
const orderRoutes = require('./api/routes/orders');


//using MORGAN
app.use(morgan('dev'));

//using BODYPARSER to extract body requests
app.use(bodyParser.urlencoded({extended:false}));
//bodyParser stringify
app.use(bodyParser.json());

//append the HEADERS to any res we sent back
//allow access of any origin + which kind of headers we want to accept
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, x-requested-with, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});



//using a diff format of app.use with a filter as first argument
app.use('/products', productRoutes);
//we use ((req, res, next)) seq. in the appropriate folder
app.use('/orders', orderRoutes);


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