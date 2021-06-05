const mongoose = require('mongoose')
const admin = new mongoose.Schema({
    Login: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        unique: true
    },
    Password: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
})

const mongoAdmin = mongoose.model('admins', admin)
module.exports = { mongoAdmin }