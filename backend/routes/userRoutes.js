import express from "express";
import { getWatchlist,getWatchedList,addToWatchedList,addToWatchlist,removeFromWatchlist } from "../controllers/userActions.js";
import  authMiddleware  from "../middleware/authmiddleware.js";

const router=express.Router();

router.get("/watchlist",authMiddleware,getWatchlist);
router.get("/watchedlist",authMiddleware,getWatchedList);
router.post("/watchlist/:movie_id",authMiddleware,addToWatchlist);
router.post("/watchedlist/:movie_id",authMiddleware,addToWatchedList);
router.delete("/watchlist/:movie_id",authMiddleware,removeFromWatchlist);

export default router;