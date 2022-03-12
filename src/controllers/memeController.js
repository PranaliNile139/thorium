let axios = require("axios")

let memes = async function(req,res) {
    try{
        // let id = req.query.id
        let options = {
            method: "post",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let createMemes = async function (req, res) {
    try {
        let id = req.query.id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let name =  req.query.name
        let pass = req.query.pass

        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${text0}&text1=${text1}&username=${name}&password=${pass}`
        }
        let result = await axios(options);
        res.status(200).send({ data: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.memes = memes
module.exports.createMemes = createMemes