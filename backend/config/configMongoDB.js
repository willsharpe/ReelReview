import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB=async()=>{
    try{
        console.log(`Connecting to mongo URI:`,process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL,);
    }
    catch(error){
        console.error("Error connecting to MongoDB",error.message);
        process.exit(1);
    }
};
export default connectDB;