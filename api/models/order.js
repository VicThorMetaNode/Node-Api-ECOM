//define how a order should looks like

//import Mongoose
const mongoose = require('mongoose');

//create schemas based on existing products: create 1 specific order id + related product name + related product quantity
//notice: we are about to create relation despite the fact that MongoDb is a non relational db
//product: required: true !!!
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, //ref:'Product' = name as 1st argument in module.exports in product.js
    quantity: { type: Number, default: 1 } //quantity is an option  we can also define is as required: true instead of default: 1
});

module.exports = mongoose.model('Order', orderSchema);