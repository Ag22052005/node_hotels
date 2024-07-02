const mongoose = require('mongoose');

require('dotenv').config();

const mongoURL = process.env.MONGO_URL


mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected',()=>{
  console.log('db connected......')
})
db.on('disconnected',()=>{
  console.log('db disconnected......')
})

module.exports = db;