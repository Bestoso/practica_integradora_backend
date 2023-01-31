const mongoose = require('mongoose')

const messagesCollection = 'messages'

const messagesSchema = new mongoose.Schema({
    first_name: String,
    last_name: String
})

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

module.exports = messagesModel
