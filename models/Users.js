const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
})

module.exports = mongoose.model('Users', userSchema)