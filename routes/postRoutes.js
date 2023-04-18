const express = require('express')
const { getUser } = require('../controller/userCtrl')
const { createPost, editPost, deletePost, getPost, singlePost } = require('../controller/postCtrl')

const route = express.Router()

route.get('/', getPost)
route.get('/:id', singlePost)
route.post('/create', createPost)
route.put('/edit/:id', editPost)
route.delete('/delete/:id', deletePost)





module.exports = route