const bookModel =require("../Models/booksModel");
const userModel =require("../Models/userModel");
const reviewModel =require("../Models/reviewModel");
const mongoose = require("mongoose");
const validator = require('../Validator/validation');

// // const removeUploadedFiles = require('multer/lib/remove-uploaded-files');
// const aws = require("aws-sdk")

// aws.config.update(
//     {
//         accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//         secretAccessKeyId: "qGG1HE0qRixcW1T1Wg1bv+08tQrIkFVyDFqSft4J",
//         region: "ap-south-1"
//     }
// );

// let uploadFile = async (file) => {
//     return new Promise( function(resolve, reject) {
//         //this function will upload file to aws and return the link
//         let s3 = new aws.S3({ apiVersion: "2006-03-01" }) //we will be using s3 service of aws
//         //  await uploadFile(files[0])
//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "classroom-training-bucket", // HERE
//             Key: "pranali/" + file.originalname, // HERE "pranali/bookCover.jpg"
//             Body: file.buffer
//         };

//         s3.upload(uploadParams, function (err, data) {
//             if (err) { 
//                 return reject({ "error": err }) 
//             }

//             console.log(data)
//             console.log(" file uploaded succesfully ")
//             return resolve(data.Location) // HERE
//           })
//     })
// }


// let bookCoverURL =  async function (req, res) {
//     try {
//         let files = req.files
//         if (files && files.length > 0) {
//             //upload to s3 and get the uploaded link
//             // res.send the link back to frontend/postman
//             let uploadedFileURL = await uploadFile(files[0])
//             res.status(201).send({status: true, msg: "file uploaded succesfully", data: uploadedFileURL })
//         }
//         else {
//             res.status(400).send({status: false, msg: "No file found" })
//         }
//     }
//     catch (err) {
//         console.log("This is the error :", err.message)
//         return res.status(500).send({ msg: "Error", error: err.message })
//     }
// }

// module.exports.bookCoverURL = bookCoverURL




//  ************************************************************* POST /books ************************************************************* //

const createBook = async function(req,res) {
    try {
        const body =req.body; 

        const query = req.query;
        if(validator.isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters"});
        }

        //Validate body
        if (!validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "body should not be empty" });
        }

        const {title, excerpt, userId, ISBN, category, subcategory, reviews, releasedAt} = body;

        //Validate title
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, msg: "Book title is required" });
        }

        //Validate excerpt
        if (!validator.isValid(excerpt)) {
            return res.status(400).send({ status: false, msg: "Book excerpt is required" });
        }

        //Validate userId
        if (!validator.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "userId is required" });
        }

        // Validation of userId
        if(!validator.isValidobjectId(userId)) {
            return res.status(400).send({ status: false, msg: "Invalid userId"});
        }

        //Validate ISBN
        if (!validator.isValid(ISBN)) {
            return res.status(400).send({ status: false, msg: "ISBN is required" });
        }

        // Validation of ISBN
        if(!validator.isValidateISBN(ISBN)) {
            return res.status(400).send({ status: false, msg: "ISBN validation is required"});
        }

        //Validate category
        if (!validator.isValid(category)) {
            return res.status(400).send({ status: false, msg: "category is required" });
        }

        //Validate subcategory
        if (!validator.isValid(subcategory)) {
            return res.status(400).send({ status: false, msg: "subcategory is required" });
        }

        //Validate releasedAt
        if (!validator.isValid(releasedAt)) {
            return res.status(400).send({ status: false, msg: "releasedAt is required" });
        }

        // Validation of releasedAt
        if(!validator.isValidDate(releasedAt)) {
            return res.status(400).send({ status: false, msg: "Validation of releasedAt is required"})
        }


        // Cheking duplicate Entry Of Book 
        let duplicateEntries = await bookModel.find();
        let duplicateLength = duplicateEntries.length

        if (duplicateLength != 0) {
            // Checking duplicate title
            const duplicateTitle = await bookModel.findOne({ title: title });
            if (duplicateTitle) {
                return res.status(400).send({status: false, msg: `${title} title already exists` });
            }

            // Checking duplicate ISBN
            const duplicateISBN = await bookModel.findOne({ ISBN: ISBN });
            if (duplicateISBN) {
                return res.status(400).send({status: false, msg: `${ISBN} ISBN already exists` });
            }
        }

        let user = await userModel.findById(userId);
        if(!user) {
            return res.status(400).send({ status: false, msg: "UserId not found"})
        }


        const bookData = {
            title,
            excerpt,
            userId,
            ISBN,
            category,
            subcategory,
            reviews,
            releasedAt: releasedAt ? releasedAt: "releasedAt is required",
        };

        let savedBook = await bookModel.create(bookData);
        return res.status(201).send({status: true, msg: "New book created", data: savedBook})
    }
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.createBook = createBook





// ************************************************************* GET /books ************************************************************* //

const getBook = async function (req, res) {
    try {
        // const queryParams = req.query;

        const body = req.body;
        if(validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "Body must not be present"})
        }

        let filter = {
            isDeleted: false
            // deletedAt: null
        }
        
            if(req.query.userId) {
                if(!(validator.isValid(req.query.userId) && validator.isValidobjectId(req.query.userId))) {
                    return res.status(400).send({status: false, msg: "UserId not valid"})
                }
                filter["userId"] = req.query.userId
            }

            if(req.query.category) {
                if(!validator.isValid(req.query.category)) {
                    return res.status(400).send({status: false, msg: "Book Category not valid"})
                }
                filter["category"] = req.query.category
            }

            if(req.query.subcategory) {
                if(!(validator.isValid(req.query.subcategory))) {
                    return res.status(400).send({status: false, msg: "subcategory not valid"})
                }
                filter["subcategory"] = req.query.subcategory
            }
                    
        

        let bookData = await bookModel.find(filter).select({_id: 1, title: 1, excerpt: 1, userId: 1, category: 1,reviews: 1, releasedAt: 1 });
        
        const bookDetail = bookData.sort(function(a,b) {
            if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1 };
            if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1 };
            return 0;
        })
        if(bookData.length > 0) {
            return res.status(200).send({status:true,count: bookDetail.length,message: 'Books list', data:bookDetail})
        } else {
            return res.status(404).send({ status: false, msg: "Book not found"})
        }
        
    } catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.getBook = getBook





// *********************************************************** GET /books/:bookId ***********************************************************//

const getBookWithReview = async function(req,res) {
    try {
        const _id = req.params.bookId;

        // Book Id not valid
        if(!validator.isValidobjectId(_id)) {
            return res.status(400).send({status:false, msg:"BookId is not valid"})
        }

        // Body must not be present
        const body = req.body;
        if(validator.isValidBody(body)) {
            return res.status(400).send({ status: false, msg: "Body must not be present"})
        }

        // Query must not be present
        const query = req.query;
        if(validator.isValidBody(query)) {
            return res.status(400).send({ status: false, msg: "Invalid parameters"});
        }

        if (Object.keys(_id).length === 0) {
            return res.status(400).send({ status: false, msg: "Invalid request" });
        }


        // Book Details with Book Id
        let bookDetails = await bookModel.findOne({ _id, isDeleted: false });
        if (!bookDetails) {
            return res.status(404).send({ status: false, message: "No book found" });
        }

        const {title,excerpt,userId,ISBN,category,subcategory,releasedAt,deletedAt,isDeleted,reviews,createdAt,updatedAt} = bookDetails;
        
        let reviewData = await reviewModel.find({ bookId: _id, isDeleted: false });

        const book = {_id,title,excerpt,userId,category,subcategory,isDeleted,reviews: reviewData.length,deletedAt,releasedAt,createdAt,updatedAt,reviewsData: reviewData};
        
        return res.status(200).send({ status: true, data: book})
    }
    
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.getBookWithReview = getBookWithReview





// ********************************************************** PUT /books/:bookId ********************************************************** //

// PUT /books/:bookId  - update
const updateBooks = async function (req, res) {
    try {
        const updateBookData = {}
    let bookId = req.params.bookId
    if(!bookId) return res.status(400).send({status:false, msg:"bookId is required"})

    let body = req.body
     //Validate body
     if (!validator.isValidBody(body)) {
        return res.status(400).send({ status: false, msg: "body should not be empty" });
    }

    // Query must not be present
    const query = req.query;
    if(validator.isValidBody(query)) {
        return res.status(400).send({ status: false, msg: "Invalid parameters"});
    }

    let { title, excerpt, releasedAt, ISBN, subcategory } = req.body
   
    let titleExist = await bookModel.findOne({ title: title })
    if (titleExist) return res.status(400).send({ status: false, msg: "title exist already" })
    
    let isbnExist = await bookModel.findOne({ ISBN: ISBN })
    if (isbnExist) return res.status(400).send({ status: false, msg: "ISBN exist already" })

    let data = await bookModel.findById(bookId)
    if (!data.isDeleted == false){
        return res.status(404).send({ status: false, msg: "data is already deleted"})
 }
 if (subcategory) {
    let dbsubcategory = data.subcategory;
    subcategory = [...dbsubcategory,subcategory];
    subcategory = subcategory.filter((val, index, arr) => arr.indexOf(val) == index)
    req.body.subcategory = subcategory

}
    let updatedBook = await bookModel.findByIdAndUpdate({_id:bookId, isDeleted:false}, req.body,{new:true})
     return res.status(200).send({status:true, data:updatedBook})

}
    catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.updateBooks = updateBooks





// ********************************************************** DELETE /books/:bookId ********************************************************** //

const deleteBook = async function(req,res){
    try{
        const bookId = req.params.bookId
           //Validate id
           if (!validator.isValidBody(bookId)) {
            return res.status(400).send({ status: false, msg: " book Id not present" });
          }

          if(!(validator.isValid(bookId) && validator.isValidobjectId(bookId))) {
            return res.status(400).send({status: false, msg: "BookId not valid"})
        }

          let data =await bookModel.findById(bookId)
          if(data.isDeleted == true){
              return res.status(404).send({ status: false, msg: "This book is already deleted" })
          }
          
          if(data.isDeleted == false){
            //   let date = moment().format('YYYY-MM-DD[T]HH:mm:ss')
              await bookModel.findByIdAndUpdate({ _id: bookId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true })
              return res.status(200).send({ status: true, msg: "Book deleted successfully" })
            }
        }
        catch (err) {
        console.log("This is the error :", err.message)
        return res.status(500).send({ msg: "Error", error: err.message })
    }
  }

module.exports.deleteBook = deleteBook





////////////////////////////////////////////////////////// END OF BOOK CONTROLLER //////////////////////////////////////////////////////////////