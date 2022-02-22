let obj = require('./formatter')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    let name = ' functionUp '
    console.log('Name in lowercase is: ',name.toLowerCase())
    console.log('Nme in uppercase is: ',name.toUpperCase())
});


module.exports = router;
// adding this comment for no reason