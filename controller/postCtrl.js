
const asyncHandeler = require('express-async-handler')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const postModel = require('../model/postModel')



// ! getALl Post 

const getPost = asyncHandeler(async (req, res) => {

    const username = req.query.user
    const catName = req.query.cat

    try {
        let posts;
        if (username) {
            posts = await postModel.find({ username })
        } else if (catName) {
            posts = await postModel.find({
                categories: {
                    $in: [catName],
                }
            })
        } else {
            posts = await postModel.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

//  !get single post

const singlePost = asyncHandeler(async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
})
// ! Create Post

const createPost = asyncHandeler(async (req, res) => {
    try {
        const newPost = await postModel.create(req.body)

        res.status(200).json(newPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
// ! edit  Create Post

const editPost = asyncHandeler(async (req, res) => {
    try {
        const newPost = await postModel.findById(req.params.id)

        if (newPost.username === req.body.username) {
            const updatePost = await postModel.findOneAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatePost)
        } else {
            res.status(400).json(" update only your video")
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
// ! delete  Create Post

const deletePost = asyncHandeler(async (req, res) => {
    try {
        const newPost = await postModel.findById(req.params.id)

        if (!newPost) {
            res.status(404).json("Post not found")
        }
        if (newPost.username === req.body.username) {
            await newPost.deleteOne()
            res.status(200).json(`delete post  `)
        } else {
            res.status(400).json(" delete only your video")
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
module.exports = {
    getPost,
    createPost,
    editPost,
    deletePost,
    singlePost
}