let axios = require("axios")

let getWeather = async function (req, res) {
    try {
        let q = req.query.q
        let appid = req.query.appid
        console.log(`query params are: ${q} ${appid}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
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



let getCities = async function (req, res) {
    try {
        let cities = ["Bangalore", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let appid = req.query.appid
        let arrays = []
        for (i = 0; i < cities.length; i++) {
            let sort = { city: cities[i] } //{city: Bangalore}
            
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=${appid}`
            }
            let result = await axios(options)
            sort.temp = result.data.main.temp
            arrays.push(sort) //{city: Bangalore, temp: 250}
        }
        let citiesTemp= arrays.sort(function (a, b) { return (a.temp - b.temp) }) 
             res.status(200).send({status:true, data: citiesTemp})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

module.exports.getWeather = getWeather
module.exports.getCities = getCities