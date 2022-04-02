const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")
const bookController = require("../Controllers/bookController")
const reviewController = require("../Controllers/reviewController")
const auth = require("../middleware/auth")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

// ASSIGNMENT/AWS-S3-PROMISE 
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",  // id
  secretAccessKey: "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",  // secret password
  region: "ap-south-1" 
});


// this function uploads file to AWS and gives back the url for the file
let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) { 
    
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });
    var uploadParams = {
      ACL: "public-read", 
      Bucket: "classroom-training-bucket", // HERE
      Key: "pranali/" + file.originalname, // HERE    
      Body: file.buffer, 
    };

    s3.upload(uploadParams , function (err, data) {
      if (err) {
        return reject( { "error": err });
      }
      console.log(data)
      console.log("File uploaded successfully.");
      return resolve(data.Location); //HERE 
    });
  });
};

router.post("/write-file-aws", async function (req, res) {
  try {
    let files = req.files;
    if (files && files.length > 0) {
      let uploadedFileURL = await uploadFile( files[0] );  
      res.status(201).send({ status: true,msg: "file uploaded succesfully", data: uploadedFileURL });

    } 
    else {
      res.status(400).send({ status: false, msg: "No file to write" });
    }

  } 
  catch (err) {
    console.log("error is: ", err);
    res.status(500).send({ status: false, msg: "Error in uploading file" });
  }

});




// User Controller
router.post('/register', userController.createUser)

router.post('/login', userController.login)

// Book Controller
router.post('/books',auth.auth, bookController.createBook)

router.get('/books',auth.auth, bookController.getBook)

router.get('/books/:bookId',auth.auth, bookController.getBookWithReview)

router.put('/books/:bookId',auth.auth, bookController.updateBooks)

router.delete('/books/:bookId',auth.auth, bookController.deleteBook)

// Review Controller
router.post('/books/:bookId/review', reviewController.bookReview)

router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)

router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

//  aws-S3-Promises
// router.post('/bookCoverURL', bookController.bookCoverURL)

module.exports = router;