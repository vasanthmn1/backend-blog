const asyncHandeler = require('express-async-handler')
const categories = require('../model/categories')

// ! add
const addCat = asyncHandeler(async (req, res) => {

    try {
        const newCat = await categories.create(req.body)
        res.status(200).json(newCat)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

})
// ! get

const getCat = asyncHandeler(async (req, res) => {

    try {
        const newCat = await categories.find()
        res.status(200).json(newCat)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

})
module.exports = {
    addCat,
    getCat
}