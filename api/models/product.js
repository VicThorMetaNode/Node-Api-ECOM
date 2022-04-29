//define how a product should look like

//import Mongoose
const mongoose = require('mongoose');

//create schemas: create 1 specific product id + name + price + file download
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);