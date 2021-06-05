const mongoose = require('mongoose')
const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        default: []
    },
    count: {
        type: Number,
        default: 1
    },
    info: {
      type: Array,
      default: []
    }
})

const mongoProducts = mongoose.model('storages', product)
module.exports = { mongoProducts }