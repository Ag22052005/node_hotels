const express  = require('express')
const router = express.Router()

const MenuItem = require('./../model/menuItem')

// menu

router.get('/menu',async (req,res)=>{
  try{
    const data = await MenuItem.find()
    console.log("Menu is fetched")
    res.status(200).json(data)
  }catch(err){
    console.log(err)
    res.status(500).json({error:"Internal server error"})
  }
})
router.get('/menu/:tasteType',async (req,res)=>{
  try{
    const tasteType = req.params.tasteType;
    const data = await MenuItem.find({taste:tasteType})
    console.log(`menu with tase ${tasteType} is fetched`)
    res.status(200).json(data)
  }catch(err){
    console.log(err)
    res.status(500).json({error:"Internal server error"})
  }
})


router.post('/menu',async (req,res)=>{
  try{
    const data = req.body
    const newMenuItem =  new MenuItem(data)
    const response = await newMenuItem.save();
    console.log("menu is saved ")
    res.status(200).json(response)
  }catch(err){
    console.log(err)
    res.status(500).json({error:"Internal server error"})
  }
})


module.exports = router