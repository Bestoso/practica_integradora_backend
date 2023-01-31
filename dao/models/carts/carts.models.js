const mongoose = require('mongoose')

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    products: Array,
    total_price: Number
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = cartsModel