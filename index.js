const express = require('express')
const dotenv = require('dotenv').config()
const colrs = require('colors')
const cors = require('cors')
const multer = require('multer')
const DB = require('./config/ConntingDB')
const authRoute = require('./routes/auth')
const { usererrHandel } = require('./middleware/errMiddleware')
const userRoute = require('./routes/UserRoutes')
const PostRoute = require('./routes/PostRoutes')
const categorie = require('./routes/categories')
const path = require('path')

const port = process.env.PORT
DB()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(usererrHandel)

app.use('/images', express.static(path.join(__dirname, '/images')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json("file uploades success")
})

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/post', PostRoute)
app.use('/categorie', categorie)





app.listen(port, () => {
    console.log(`connting Port ${port}`);
})