const Person = require('./model/person')
const passport = require('passport')
const LocalStrategy  = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username,password,done)=>{
  // authentication logic 
  try{
    // console.log('credentials received : ', username,password)
    const user = await Person.findOne({username:username})
    if(!user){
      return done(null,false,{message:"Username not found"})
    }
    const isPasswordMatch = user.password === password
    if(isPasswordMatch){
      return done(null,user)
    }else{
      return done(null,false,{message:"Password is incorrect"})
    }
  }catch(err){
    return done(err)
  }
}))

module.exports = passport