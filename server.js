const express = require('express')
const app = express()

require('dotenv').config();

const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.send('Welcome Ashish Gupta')
})



const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes) // since the /person is common for all route hence we also extract from those routes and put here for all routes

const menuRoutes = require('./routes/menuRoutes')
app.use('/',menuRoutes) // without extracting the /menu routes

app.listen(3000,()=>{
  console.log("Server is listening on port 3000")
})