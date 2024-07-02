const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://admin:ashish%40123@ashishdb.ijyd4hz.mongodb.net/mydb?authSource=AshishDB&authMechanism=SCRAM-SHA-1'

mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected',()=>{
  console.log('db connected......')
})
db.on('disconnected',()=>{
  console.log('db disconnected......')
})

module.exports = db;