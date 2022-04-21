// import express using 'require' cause 'import' is not supported by Node
const express = require('express');


//setup express router using a package as a function
const router = express.Router();

//now we can use the router to define different routes
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

//set status code to 201 !
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests from /orders OK'
    });
});

//setup for details about single order using'/:' to mean any order with a name I create like productId
//extract all parameters from specific product using const + req.params.orderId
router.get('/:orderId', (req, res, next) => {
         res.status(200).json({
             message: 'Order details',
             orderId:  req.params.orderId
         });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted !',
        orderId:  req.params.orderId
    });
});


module.exports = router;