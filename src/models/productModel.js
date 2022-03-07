const mongoose = require('mongoose');

const product1Schema = new mongoose.Schema( {
    name: String,
    category: String,
    price: {
        type: Number,
        require: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product1', product1Schema)