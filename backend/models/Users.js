import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const userSchema =new mongoose.Schema({
    watchlist:[{type:mongoose.Schema.Types.ObjectId, ref:'Movie'}],
    watchedList:[{type:mongoose.Schema.Types.ObjectId,ref:'Movie'}],
    email:{required:true,type:String,unique:true},
    username:{required:true,type:String,unique:true},
    profilePhoto:String,
    salt:String,
    hash:String,
});

userSchema.methods.setPassword =async function(password){
    this.salt=await bcrypt.genSalt(10);
    this.hash=await bcrypt.hash(password,this.salt);
   
};
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.hash);
  };
  
userSchema.methods.generateJWT=function(){
   const today=new Date();
   const exp=new Date(today);
   exp.setDate(today.getDate()+60);
    return jwt.sign({
        id:this._id,
        username:this.username,
        exp:Math.floor(exp.getTime()/1000),
    },process.env.secret)
};
userSchema.methods.toAuthJSON=function(){
    return {
        username:this.username,
        email:this.email,
        token:this.generateJWT()
    };
};

const User=mongoose.model("User",userSchema);
export default User;


