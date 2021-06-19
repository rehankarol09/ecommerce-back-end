const jwt = require('jsonwebtoken');

exports.requiresignin = (req,res,next)=>{
    
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(token,process.env.Jwt_Secret);
    req.user=user;
    next();
    
}


exports.adminMiddleware = (req,res,next)=>{
if(req.user.role!= 'admin') return res.status(402).json({message:'Acess denied'});
 next();

}