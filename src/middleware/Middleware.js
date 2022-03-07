const headerValidation = function(req,res,next) {
    let data = req.headers["isfreeappuser"]
    console.log(data)
    if(data) {
        next()
    } else {
        res.send("Request is missing")
    }
}

module.exports.headerValidation = headerValidation