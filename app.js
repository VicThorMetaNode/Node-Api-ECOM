//handling requests using Express
//import express using require
const express = require('express');

//executing express as a function
const app = express();

//import morgan package for login incoming requests
const morgan = require('morgan');

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


//using Morgan 
app.use(morgan('dev'));


//using a diff format of app.use with a filter as first argument
app.use('/products', productRoutes);
//we use ((req, res, next)) seq. in the appropriate folder
app.use('/orders', orderRoutes);


//handling error 404
app.use((req, res, next) => {
    const error = new Error('Route not Found');
    error.status = 404;
    next(error);
})

//handling error 500
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;