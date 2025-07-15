import express from "express";
import Movie from "../models/movies.js";
const router = express.Router();
router.get("/",async(req,res)=> {
    try{
        const movies = await Movie.find().limit(52);
        res.json(movies);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch movies"});

    }
});

export default router;