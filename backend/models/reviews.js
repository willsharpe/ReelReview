import mongoose from "mongoose";
const reviewSchema =new mongoose.Schema({
    review:String,
    movie:{type:mongoose.Schema.Types.ObjectId,ref:"Movie"},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    rating:String
},{timestamps:true});
const Review = mongoose.model("Review",reviewSchema);
export default Review;