const express = require('express')
const { getUser, editUser } = require('../controller/userCtrl')

const route = express.Router()


route.get('/:id', getUser)
route.put('/:id', editUser)


module.exports = route