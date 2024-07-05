const jwt  = require('jsonwebtoken')

const jwtmiddleware = (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).json({ error: "Unauthorized" });
  }
  const token = req.headers.authorization.split(' ')[1];
  if(!token) return res.status(401).json({error:"Unauthorized"})
  
  try {
    const decode = jwt.verify(token,process.env.SPECIAL_KEY)
    req.user = decode // add a new key-value in req body as user which returns the info of user
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({error:"Unauthorized"})
  }
}

const createJwt = (userdata)=>{
  const token = jwt.sign(userdata,process.env.SPECIAL_KEY,{expiresIn:30})// token will expires in 30 seconds
  return token;

}

module.exports = {jwtmiddleware,createJwt};