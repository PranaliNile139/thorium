let obj = require('./helper')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    let date = new Date();
    let today = new Date();
    let day = date.getDate()+'-'+(date.getMonth()+1)+'-'+today.getFullYear()
    console.log('Current date is: ', day)
    let month = today.getMonth() + 1
    console.log('Current month is: ',month);
    console.log('Thorium, W3D1, the topic for today is Nodejs module system');
});


module.exports = router;
// adding this comment for no reason