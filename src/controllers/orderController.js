const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")
const OrderModel = require("../models/orderModel")

const createOrder = async function (req, res) {
    let order = req.body;
    let userId = req.body.user_id;
    let productId = req.body.product_id;
    let currentDate = new Date()
    let updatedDate = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()

    if (!userId) {
        return res.send("user Id must be present");
    }

    let validId = await UserModel.findById(userId);
    if (!validId) {
        return res.send("no user present with the given id");
    }

    if (!productId) {
        return res.send("product Id must be present");
    }


    let validProductId = await ProductModel.findById(productId);
    if (!validProductId) {
        return res.send("no product present with the given id");
    }

    let orderCreated = await OrderModel.create(order);
    let value = req.headers["isfreeappuser"]
    if (value == "true") {
        let customer = await OrderModel.findOneAndUpdate(
            { user_id: userId },
            { $set: { amount: 0, isFreeAppUser: true, date: updatedDate } },
            { $new: true }

        )
        return res.send({ data: customer })

    }
    else {

        let userBalance = await UserModel.findById(userId)
        let productAmount = await ProductModel.findById(productId)
        let pay = userBalance.balance - productAmount.price
        if (pay >= 0) {
            let customerOrder = await OrderModel.findOneAndUpdate(
                { user_id: userId },
                { $set: { amount: productAmount.price, isFreeAppUser: true, date: updatedDate } },
                { $new: true }

            )
            let customer = await UserModel.findOneAndUpdate(
                { _id: userId },
                { $set: { balance: pay, isFreeAppUser: true } },
                { $new: true }

            )
            let result = {}
            result.order = customerOrder
            result.user = customer

            return res.send({ data: result })
        } else {
            return res.send({ msg: "insufficient balance" })
        }

    }

};

module.exports.createOrder = createOrder