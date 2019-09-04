const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//import Routes 
const commentRoute = require('./routes/comments.js')
const userRoute = require('./routes/users.js')

app.use('/api/comments', commentRoute)
app.use('/api/users', userRoute)

app.use(express.json())

// use is a middleware for a logic when we re at the route

app.get('/', (req, res) => {
    res.send('ssss')
})

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true }, 
() => console.log('connected to DB'))

module.exports = app