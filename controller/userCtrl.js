
const asyncHandeler = require('express-async-handler')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')
const cloudinary = require('../utils/cloudinary')

const getUser = asyncHandeler(async (req, res) => {
    try {

        const user = await userModel.findById(req.params.id)
        const { password, ...others } = user._doc

        res.status(200).json({ user: others })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


module.exports = {
    getUser,

}