import User from "../models/Users.js";
import Movie from "../models/movies.js";


 const addToWatchlist=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({
                message:"You're not logged in!"
            });
        }
        const movie=await Movie.findById(req.params.movie_id);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        const isInWatchList=user.watchlist.some(
            id=>id.toString() === movie._id.toString()
        );
        if(isInWatchList){
            return res.status(300).json({
                message:"This movie is alredy in your watchlist"
            });
        }
        user.watchlist.push(movie);
        await user.save();
        res.status(200).json({
            message:"Added to watchlist"
        });
    }
    catch(error){
        return res.status(400).json({
            message:"Error adding movie to watchlist",
            error:error.message
        });
    }
}


const addToWatchedList=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({
                message:"You're not logged in!"
            });
        }
        const movie=await Movie.findById(req.params.movie_id);
        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }
        const isInWatchedList=user.watchedList.some(
            id => id.toString() === movie._id.toString()
        );
        if(isInWatchedList){
            return res.status(300).json({
                message:"You already watched this movie"
            });
        }
        const isInWatchList=user.watchlist.some(
            id=>id.toString() === movie._id.toString()
        );
        if(isInWatchList){
            user.watchlist.pull(movie);
        }
        user.watchedList.push(movie);
        await user.save();
        res.status(200).json({
            message:"Added to watched list"
        });
    }
    catch(error){
        return res.status(400).json({
            message:"Error adding movie to watched list",
            error:error.message
        });
    }
}


const getWatchlist=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).populate("watchlist");
        if(!user){
            return res.status(404).json({
                message:"You're not logged in!"
            });
        }
        res.status(200).json({
            message:"Successfully returned watch list",
            data:user.watchlist
        });
    }
    catch(error){
        res.status(400).json({
            message:"Error getting watch list",
            error:error.message
        });
    }
}

const getWatchedList=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).populate("watchedList");
        if(!user){
            return res.status(404).json({
                message:"You're not logged in!"
            });
        }
        res.status(200).json({
            message:"Successfully returned watched list",
            data:user.watchedList
        });
    }
    catch(error){
        res.status(400).json({
            message:"Error getting watched list",
            error:error.message
        });
    }

}
const removeFromWatchlist=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message:"You're not logged in"
            });
        }
        const movie=await Movie.findById(req.query.movie_id);
        if(!movie){
            return res.status(404).json({
                message:"Error finding movie"
            });
        }
        if(!user.watchlist.includes(movie._id)){
            return res.status(404).json({
                message:"Movie not in watchlist"
            });
        }
        user.watchlist.pull(movie._id);
        await user.save();
    }
    catch(error){
        res.status(400).json({
            message:"Error getting watched list",
            error:error.message
        });
    }
}

export {
    getWatchlist,
    addToWatchedList,
    addToWatchlist,
    getWatchedList,
    removeFromWatchlist
};