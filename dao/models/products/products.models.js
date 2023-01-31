const mongoose = require('mongoose')

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    category: String
})

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = productsModel