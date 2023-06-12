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
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
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
