const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./api/router')
require('dotenv').config()

app.use(express.json());
// setup the logger
app.use(morgan('combined'))

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.use('/api', router)
  
app.listen(3000, () => {
    console.log("Server started successfully, running on port: 3000")
})