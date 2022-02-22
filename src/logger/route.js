let obj = require('./logger')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.printMyMessage('Call welcome')
    console.log(obj.url)
    res.send('Welcome to my application. Hi, I am Pranali Nile and a part of FunctionUp Thorium cohort!')
});


module.exports = router;
// adding this comment for no reason