import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const  authMiddleware =async(req,res,next)=>{
    const header=req.header('Authorization');
    if(!header){
        return res.status(401).json({
            message:"Invalid header"
        });
    }
    const token = req.header("Authorization")?.split(" ")[1]; 
    if(!token){
        res.status(401).json({
            message:"Invalid token"
        });
    }
    try{
        const decoded=jwt.verify(token,process.env.secret);
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(400).json({
            message:"Error authenticating"
        });
    }

};
export default authMiddleware;