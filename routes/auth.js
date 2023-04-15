const express = require('express')
const { registerUser, loginUser } = require('../controller/authCtrl')

const route = express.Router()


route.post('/register', registerUser)
route.post('/login', loginUser)


module.exports = route