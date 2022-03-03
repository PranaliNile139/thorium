const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName: String,
    age:Number,
    rating: Number

},
{ timestamps: true }
);

module.exports = mongoose.model('author1', authorSchema)

























// const authorSchema = new mongoose.Schema( {
//     authorName: String,
//     age:Number,
//     address:String

// },
// { timestamps: true }
// );

// module.exports = mongoose.model('newAuthor', authorSchema)
