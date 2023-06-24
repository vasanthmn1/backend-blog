
const asyncHandeler = require('express-async-handler')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const postModel = require('../model/postModel')
const cloudinary = require('../utils/cloudinary')



// ! getALl Post 

const getPost = asyncHandeler(async (req, res) => {

    const username = req.query.user
    const catName = req.query.cat
    const search = req.query.search


    try {
        let posts;
        if (username) {
            posts = await postModel.find({ username })
        }
        else if (catName) {
            posts = await postModel.find({
                categories: {
                    $in: [catName],
                }
            })
        }
        else if (search) {
            posts = await postModel.find({ title: search })
        }

        else {
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


const uploadImageToCloudinary = async (imageURL) => {
    try {




        const newImage = await cloudinary.uploader.upload(imageURL, {
            folder: 'blogWebsite',
            transformation: [
                { quality: 50 }
            ]

        });
        return {
            public_id: newImage.public_id,
            url: newImage.secure_url
        };
    } catch (error) {
        throw new Error('Failed to upload image to Cloudinary.');
    }
};

const createPosts = async (title, poto, desc, username) => {
    try {
        const image = await uploadImageToCloudinary(poto.url);

        const newPost = await postModel.create({
            poto: image,
            title,
            desc,
            username
        });
        return newPost;
    } catch (error) {
        throw new Error('Failed to create post.');
    }
};



const createPost = asyncHandeler(async (req, res) => {
    const { title, poto, desc, username } = req.body;
    try {
        const newPost = await createPosts(title, poto, desc, username)

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