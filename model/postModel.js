const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    poto: {
        type: String,
    },
    username: {
        type: String,
        default: ""
    },
    categories: {
        type: Array

    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
