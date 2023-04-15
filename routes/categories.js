const express = require('express')
const { addCat, getCat } = require('../controller/categoriesCtrl')

const route = express.Router()

route.post('/add', addCat)
route.get('/', getCat)




module.exports = route