// import express using 'require' cause 'import' is not supported by Node
const express = require('express');

//import Mongoose
const mongoose = require('mongoose');
//import Models for product
const Product = require('../models/product');


//setup express router using a package as a function
const router = express.Router();

//now we can use the router to define different routes
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests from /products OK'
    });
});

//set status code to 201 !
router.post("/", (req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
    });
    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /products",
          createdProduct: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

//setup for details about single product using'/:' to mean any product with a name I create like productId
//extract all parameters from specific product using const + req.params.productId
//NOTICE: we res.status(200) inside .then to be sure it is call before err (synchronous)
router.get('/:productId', (req, res, next) => {
     const id = req.params.productId;
     Product.findById(id)
     .exec()
     .then(doc => {
       console.log("From database", doc);
       if (doc) {
        res.status(200).json(doc);
       } else {
         res.status(404).json({
           message: 'No valid entry found'
         });
       }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
     });
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product !'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product !'
    });
});


module.exports = router;