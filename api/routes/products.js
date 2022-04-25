// import express using 'require' cause 'import' is not supported by Node
const express = require('express');

//import Mongoose
const mongoose = require('mongoose');
//import Models for product
const Product = require('../models/product');


//setup express router using a package as a function
const router = express.Router();

//now we can use the router to define different routes
//docs = products in this case
//Product.find(empty) = all docs
router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(docs => {
    console.log(docs);
// the if statement is not necessary cause 404 error is for empty array
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({
        message: 'No entries found'
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
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

//update using updateMany method after identifier for the object + how to update it as second argument{$set:}
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
//check if we want to update just a single argument: name or price or... declaring a new const + a loop through all operations (ops)
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value; // value = { name: req.body.newName, price: req.body.newPrice } *
  }

  Product.replaceOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//* to make any change we ask for an array [] in which we use props ex: [{ "propName" : "anyname"}]

//using filter criteria + _id
//_id = property / id = value
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
    Product.deleteMany({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});


module.exports = router;