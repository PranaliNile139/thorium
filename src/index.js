const express = require('express');
const moment = require("moment");
const requestIp = require("request-ip")
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');

const app = express();
// const dt = moment();

app.use(requestIp.mw({ attributeName: 'customIp' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    let date = moment().format('MMMM Do YYYY, h:mm:ss a')
    let ip = req.customIp;
    let url = req.url
    console.log(date, ip, url)
    next()
})


mongoose.connect("mongodb+srv://taabish:lkmgsyjhwbQYgkvX@cluster0.cp3ka.mongodb.net/pranali139?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
