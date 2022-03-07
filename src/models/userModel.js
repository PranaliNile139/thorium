const mongoose = require('mongoose');

const user1Schema = new mongoose.Schema( {
    name: String,
    balance: {
        type: Number,
        default: 100
    },
    address: String,
    age: Number,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User1', user1Schema)








    // lastName: String,
    // mobile: {
    //     type: String,

    //     required: true
    // },
    // emailId: String,
     //"falana" will give an error
   
    // age: Number,
 //users



// String, Number
// Boolean, Object/json, array