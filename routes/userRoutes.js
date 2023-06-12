const express = require('express')
const { getUser } = require('../controller/userCtrl')

const route = express.Router()


route.get('/:id', getUser)



module.exports = route