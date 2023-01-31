const mongoose = require('mongoose');

const userCollection = 'users';

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password: String,
    age: Number,
    email: {
        type: String,
        unique: true
    }
});

const usersModel = mongoose.model(userCollection, usersSchema);

module.exports = usersModel;