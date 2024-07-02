const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  name:{
    type : String,
    required:true
  },
  price:{
    type : Number,
    default:0,
    required:true
  },
  taste:{
    type : String,
    enum:["sweet","spicy","sour"],
    required:true
  },
  isDrink: {
    type : Boolean,
    default:false
  },
  ingredients:{
    type : [String],
    default:[],
  },
  numSales:{
    type : Number,
    default:0,
  },
}
)
const menuItem = mongoose.model('menuItem',menuItemSchema)
module.exports = menuItem;