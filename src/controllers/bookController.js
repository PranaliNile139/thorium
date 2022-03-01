const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor = async function(req,res) {
    let authorData = req.body
    let author = await AuthorModel.create(authorData)
    res.send( { msg: author })
}

const bookByChetan = async function(req,res) {
    let authorDetails = await AuthorModel.findOne( { author_name: "Chetan Bhagat"})
    let authorId = authorDetails.author_id
    let chetanBook = await BookModel.find( {author_id: authorId}).select( {name:1, _id:0})
    res.send({bookByChetan: chetanBook})
}

const priceUpdate = async function(req,res) {
    let update = req.body
    let bookData = await BookModel.findOneAndUpdate(
        {name: "Two states"}, {$set: update}, {new: true}
    )
    let authorId = bookData.author_id
    let author = await AuthorModel.findOne({author_id: authorId}).select({author_name:1, _id:0})
    console.log(author)
    res.send({author_name: author.author_name, price: bookData.price })
}

const booksInPrice = async function(req,res) {
    let books = await(await BookModel.find({price: {$gte: 60, $lte: 100}}).select({author_id:1, _id:0})).map(x => x.author_id)
    console.log(books)

    let arr = []
    for(let i=0; i<books.length; i++) {
        let arr1 = await(await AuthorModel.find({author_id: books[i]}).select({author_name:1, _id:0})).map(x => x.author_name)
        arr.push(arr1)
    }
    const arrayOfAuthors = arr.flat()
    res.send({author_name: arrayOfAuthors})
}

module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.bookByChetan= bookByChetan
module.exports.priceUpdate= priceUpdate
module.exports.booksInPrice= booksInPrice













// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
