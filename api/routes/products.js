// import express using 'require' cause 'import' is not supported by Node
const express = require('express');


//setup express router using a package as a function
const router = express.Router();

//now we can use the router to define different routes
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests from /products OK'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests from /products OK'
    });
});

//setup for details about single product using'/:' to mean any product with a name I create like productId
//extract all parameters from specific product using const + req.params.productId
router.get('/:productId', (req, res, next) => {
     const id = req.params.productId;
     if (id === 'special') {
         res.status(200).json({
             message: 'You discovered the special ID',
             id: id
         });
     } else {
         res.status(200).json({
             message : 'You passed an ID'
         });
     }
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