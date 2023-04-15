const express = require('express')
const { getUser } = require('../controller/userCtrl')
const { createPost, editPost, deletePost, getPost } = require('../controller/postCtrl')

const route = express.Router()

route.get('/', getPost)
route.post('/create', createPost)
route.put('/edit/:id', editPost)
route.delete('/delete/:id', deletePost)





module.exports = route