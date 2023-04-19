
const asyncHandeler = require('express-async-handler')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')

const getUser = asyncHandeler(async (req, res) => {
    try {

        const user = await userModel.findById(req.params.id)
        const { password, ...others } = user._doc
        console.log(others);
        res.status(200).json({ user: others })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
const editUser = asyncHandeler(async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await userModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});
module.exports = {
    getUser,
    editUser
}