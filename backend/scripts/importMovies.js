import axios from "axios";
import mongoose from "mongoose";
import User from "../models/Users.js";
import dotenv from "dotenv";
import Movie from "../models/movies.js";
dotenv.config();

export const getMovieDetails=async function(movie_id){
    try{
        if(!movie_id){
            throw new Error("No movie ID");
        }
        const response=await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`,{
            params:{api_key:process.env.API_KEY}
        });
        const data=response.data;
        const movieDetails={
            title:data.title,
            runtime:data.runtime ? `${data.runtime} min` : "N/A",
            year:data.release_date?.split("-")[0] || "N/A",
            plot:data.overview,
            genre:data.genres?.map(genre=>genre.name,"")||[],
            poster:`https://image.tmdb.org/t/p/w500${data.poster_path}`,
            IMDB_ID:data.imdb_id,
            country:data.production_countries?.map(country=>country.name)||[],
            vote_count:data.vote_count,
            voteAverage:data.vote_average,
            tmdb_id:data.id,
            budget:data.budget
        }
        return movieDetails;
    }
    catch(error){
        console.error(`Error fetching details for ${movie_id}`,error.message);
        throw error;
    }
}




export const getMovies=async(page=1)=>{
    try{
        for (page;page<=10;page++){

            const popularMovieList= await axios.get('https://api.themoviedb.org/3/movie/top_rated',{
                params:{api_key:process.env.API_KEY,page}
            }); 
            for (const movie of popularMovieList.data.results){
                const movieDetails= await getMovieDetails(movie.id);
                if(!movieDetails){
                    continue;
                }
                const newMovie= new Movie({
                    title:movieDetails.title,
                    year:movieDetails.year,
                    runtime:movieDetails.runtime,
                    poster:movieDetails.poster,
                    IMDB_ID:movieDetails.IMDB_ID,
                    country:movieDetails.country,
                    vote_count:movieDetails.vote_count,
                    voteAverage:movieDetails.voteAverage,
                    tmdbID:movieDetails.tmdb_id,
                    budget:movieDetails.budget,
                    plot:movieDetails.plot,
                    genre:movieDetails.genre,
                    released:movieDetails.year
                });
                const ID=movieDetails.tmdb_id;
                const existing=await Movie.findOne({tmdbID:ID});
                if(!existing)await newMovie.save();
                console.log(`Successfully added movie`);
            }
        }
    }
    catch(error){
        console.error("Error adding movie",error);
        throw error;
    }
}
export default getMovies;