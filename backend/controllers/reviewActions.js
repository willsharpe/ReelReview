import Review from "../models/reviews.js";
import mongoose from "mongoose";
import User from "../models/Users.js";
import Movie from "../models/movies.js";

const addReview=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message:"You're not logged in"
            });
        }
        const movieBeingReviewed=await Movie.findById(req.query.movie_id);
        if(!movieBeingReviewed){
            return res.status(404).json({
                message:"Error finding you're movie"
            });
        }
        const review=await Review.findOne({user:req.user.id,movie:req.query.movie_id});
        if(review){
            return res.status(400).json({
                message:"You've already reviewed this movie"
            });
        }
        if(req.body.rating>5){
            return res.status(400).json({
                message:"Your rating can only be between 1-5!"
            });
        }
        const newReview=new Review({
            review:req.body.review,
            user:req.user.id,
            movie:req.query.movie_id,
            rating:req.body.rating
        });
        await newReview.save();
        res.status(200).json({
            message:"You've successfully added a review!"
        });
    }
     catch(error){
        res.status(400).json({
            message:"Error adding review",
            error:error.message
        });
     }
};

const removeReview = async (req, res) => {
    try {
      const review = await Review.findOne({
        user: req.user.id,
        movie: req.query.movie_id,
      });
  
      if (!review) {
        return res.status(404).json({
          message: "You haven't written a review for this movie",
        });
      }
  
      await Review.findByIdAndDelete(review._id);
  
      res.status(200).json({
        message: "Successfully deleted review",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting review",
        error: error.message,
      });
    }
  };

const getReviewsForMovie=async(req,res)=>{
    try{
        const movie=await Movie.findById(req.query.movie_id);
        if(!movie){
            return res.status(400).json({
                message:"Error finding movie"
            });
        }
        const reviewsForMovie= await Review.find({movie:req.query.movie_id}).populate("user");
        if(!reviewsForMovie){
            return res.status(404).json({
                message:"There are no reviews for this movie"
            });
        }
        res.status(200).json({
            message:"Successfully retrieved all reviews for this movie",
            data:reviewsForMovie
        });
    }
    catch(error){
        res.status(400).json({
            message:"Error retrieving reviews for this movie",
            error:error.message
        });
    }
};

const editReview = async (req, res) => {
    try {
      const review = await Review.findOne({
        user: req.user.id,
        movie: req.query.movie_id,
      });
  
      if (!review) {
        return res.status(404).json({
          message: "You haven't written a review for this movie",
        });
      }
  
      if (req.body.review) {
        review.review = req.body.review;
      }
  
      if (req.body.rating !== undefined) {
        review.rating = req.body.rating;
      }
  
      await review.save();
  
      res.status(200).json({
        message: "Successfully edited the review",
        updatedReview: review,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error editing the review",
        error: error.message,
      });
    }
};

const getUsersReviews = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({
          message: "You're not logged into an account",
        });
      }
  
      const usersReviews = await Review.find({ user: user._id }).populate("movie");
  
      if (usersReviews.length === 0) {
        return res.status(404).json({
          message: "This user hasn't written any reviews",
        });
      }
  
      res.status(200).json({
        message: "Successfully fetched user's reviews",
        reviews: usersReviews,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching user's reviews",
        error: error.message,
      });
    }
  };
  

  const calculateRatingForMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.query.movie_id);
      if (!movie) {
        return res.status(404).json({
          message: "Error fetching movie",
        });
      }
  
      const reviews = await Review.find({ movie: movie._id });
  
      if (reviews.length === 0) {
        return res.status(404).json({
          message: "No reviews found for this movie",
        });
      }
  
      let ratingsSum = 0;
      for (const review of reviews) {
        ratingsSum += review.rating;
      }
  
      const avgRating = ratingsSum / reviews.length;
  
      res.status(200).json({
        message: "Successfully calculated average rating",
        average: avgRating,
        numberOfReviews: reviews.length,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error calculating average rating",
        error: error.message,
      });
    }
  };
  
  export {
    calculateRatingForMovie,
    addReview,
    editReview,
    removeReview,
    getReviewsForMovie,
    getUsersReviews
  };