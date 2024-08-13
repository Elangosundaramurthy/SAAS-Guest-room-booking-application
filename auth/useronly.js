const jwt=require('jsonwebtoken');
const {User}=require('../model/usermodel');
async function useronly(req,res,next){
    const token=req.header('Authorization').replace('Bearer ','');
    if(!token){
        return res.status(401).json({error:'token is been required'});
    }
    try {
        const decoded = jwt.verify(token, 'es2323');
        if (!decoded || !decoded.userID){
        throw Error('invalid token');
        }
    const useron=await User.findOne({ _id: decoded.userID });
    if(!useron){
        return res.status(401).json({error:'user not found'});
    }
    if(useron.role === 'user'){
        req.useron=useron;
        next();
    }else{
        return res.status(403).json({error:'user not found'});
    }
    }
    catch(err){
    console.error('jwt verfication error',err);
    res.status(401).json({ error: 'Invalid token' });
    }
    }
module.exports=useronly;