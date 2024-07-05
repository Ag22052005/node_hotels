const express = require('express')
const app = express()
const db = require('./db')
const passport = require('./auth')
// const jwt = require('./jwt.js')

require('dotenv').config();

const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// middleware function
const logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleTimeString()}] Request on : ${req.originalUrl}`)
  next()
}
app.use(logRequest)
app.use(passport.initialize())


const localauthmiddleware = passport.authenticate('local',{session:false})

app.get('/',function (req, res) {
  res.send('Welcome Ashish Gupta')
})



const personRoutes = require('./routes/personRoutes')
app.use('/person' ,personRoutes) // since the /person is common for all route hence we also extract from those routes and put here for all routes

const menuRoutes = require('./routes/menuRoutes');
app.use('/',menuRoutes) // without extracting the /menu routes

app.listen(PORT,()=>{
  console.log("Server is listening on port 3000")
})