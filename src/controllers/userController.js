const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

module.exports.createUser= createUser
















// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     console.log(req.newAtribute)
//     res.send({msg: allUsers})
// }

// module.exports.getUsersData= getUsersData