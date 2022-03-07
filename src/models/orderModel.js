const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const order1Schema = new mongoose.Schema( {
    user_id: {
        type: ObjectId,
        ref: "User1"
    },
    product_id: {
        type: ObjectId,
        ref: "Product1"
    },
    amount: Number,
    isFreeAppUser: {
        type: Boolean,
        default: true
    },
    date: String
}, { timestamps: true });

module.exports = mongoose.model('Order1', order1Schema)






// category: String,
    // price: {
    //     type: Number,
    //     require: true
    // }