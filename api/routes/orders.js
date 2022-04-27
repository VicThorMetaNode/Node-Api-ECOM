// import express using 'require' cause 'import' is not supported by Node
const express = require('express');

//import Mongoose
const mongoose = require('mongoose');

//import Models for order
const Order = require('../models/order');
const Product = require('../models/product');


//setup express router using a package as a function
const router = express.Router();

//find all orders
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
   //console.log(docs);
  //set response 
 res.status(200).json({
    count: docs.length,
    orders: docs.map(doc => {
      return {
        _id: doc._id,
        product: doc.product,
        quantity: doc.quantity,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/products/' + doc._id
        }
      }
    })
  })
})
.catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});




//Schema based on order.js in Models file
router.post('/', (req, res, next) => {
//make sure we can't create an order for product we don't have
Product.findById(req.body.productId)
.then(product => {
    if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
      });
      return order
      .save();
    })
      .then(result => {
        console.log(result);
        res.status(201).json({ //set status code to 201 !
          message: "Order stored !",
          createdOrder: 
            {
              _id: result._id,
              product: result.product,
              quantity: result.quantity,
            },
              request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + result._id
              }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


//setup for details about single order using'/:' to mean any order with a name I create like productId
//extract all parameters from specific product using const + req.params.orderId
router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
     .exec()
     .then(order => {
         if (!order) {
            return res.status(404).json({
                message: 'Order not found !'
            });//to avoid order: null in case of no orderId match
         }
        res.status(200).json({
            order: order,
            message: 'Order details',
            orderId:  req.params.orderId,
            request: {
               type: 'GET',
               url: 'http://localhost:3000/orders/'
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
            type: 'POST',
            url: 'http://localhost:3000/orders/',
            body: { productId: 'ID', quantity: 'Number'}
         }
      });
    })
});


module.exports = router;