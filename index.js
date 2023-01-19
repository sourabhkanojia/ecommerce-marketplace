const express = require('express')
const app = express()
const morgan = require('morgan')
 
// setup the logger
app.use(morgan('combined'))

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
app.listen(3000)