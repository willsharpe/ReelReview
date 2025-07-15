import express from "express";
import {addReview,removeReview,editReview,calculateRatingForMovie,getReviewsForMovie,getUsersReviews} from "../controllers/reviewActions.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
const router=express.Router();

router.get("/reviews/user",authMiddleware,getUsersReviews);
router.get("/reviews/movie",authMiddleware,getReviewsForMovie);
router.delete("/reviews/:movie_id",authMiddleware,removeReview);
router.post("/reviews/:movie_id",authMiddleware,addReview);
router.put("/reviews/:movie_id",authMiddleware,editReview);

export default router;