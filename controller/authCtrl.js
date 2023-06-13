
const asyncHandeler = require('express-async-handler')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')


// ! Register


const registerUser = asyncHandeler(async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const alredyUser = await userModel.findOne({ email })

        if (alredyUser) {
            res.status(400)
                .json("Alredy use this email")
        }

        const alredyusername = await userModel.findOne({ username })

        if (alredyusername) {
            res.status(400)
                .json("Alredy use this username")
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const newUser = await userModel.create({
            username,
            email,
            password: hashpassword
        })

        res.status(200).json(
            { _id: newUser.id, username, email }
        )

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// ! Login

const loginUser = asyncHandeler(async (req, res) => {
    const { email, password } = req.body


    const user = await userModel.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {

        const { password, ...others } = user._doc
        res.json({
            user: others
        })

    } else {
        res.status(400)
        throw new Error("email or password Worng")
    }
})


module.exports = {
    registerUser,
    loginUser
}