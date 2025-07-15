
import User from "../models/Users.js";

const loginUser=async(req,res)=>{
    const{username,password}=req.body;
    console.log("Request body:", username,password);
    try{
       const user= await User.findOne({username});
       if(!user){
        console.log("No user found");
        return res.status(500).json({
            message:"You haven't created an account yet"
        });
       }
       const isValid= await user.validatePassword(password);
       if(!isValid){
        return res.status(400).json({
            message:"Incorrect password"
        });
       }
       res.status(200).json({
        message:"You're logged in!",
        userInfo:user.toAuthJSON()
       });

    }
    catch(error){
        console.log("error");
        res.status(404).json({
            message:"Failed to log in",
            error:error.message
        });
    }
};

 const registerUser=async(req,res)=>{
   try{
        const {email,username,password}=req.body;
        console.log(email);
        const user=await User.findOne({email});
        if(user){
            return res.status(409).json({
                message:"You already have an account"
            });
        }
        const userWithUsername=await User.findOne({username});
        if(userWithUsername){
            return res.status(409).json({
                message:"Sorry this name is taken"
            });
        }
        const newUser=new User({username,email});
        await newUser.setPassword(password);
        await newUser.save()
        res.status(200).json({
            message:"You successfully create an account!",
            userInfo:newUser.toAuthJSON()

        });
    }
    catch(error){
        return res.status(400).json({
            message:"Error creating account",
            error:error.message
        });
    }

    
};

 const deleteUser=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message:"Error fetching account"
            });
        }
        const result =await User.deleteOne({_id:req.user.id});
        return res.status(200).json({
            message:"Successfully deleted account"
        });
    }
    catch(error){
        return res.status(404).json({
            message:"Error deleting account"
        });
    }
};

export {
    deleteUser,
    loginUser,
    registerUser
};
