//define how a product should looks like

//import Mongoose
const mongoose = require('mongoose');

//create schemas: create 1 specific product id + name + price
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);