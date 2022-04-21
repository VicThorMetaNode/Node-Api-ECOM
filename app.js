//handling requests using Express
//import express using require
const express = require('express');

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

//using a diff format of app.use with a filter as first argument
app.use('/products', productRoutes);
//we use ((req, res, next)) seq. in the appropriate folder
app.use('/orders', orderRoutes);

module.exports = app;