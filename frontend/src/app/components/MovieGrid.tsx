'use client'
import { useEffect,useState } from "react";
import { Movie } from "../types/movies"
import  MovieCard  from "./MovieCard";
import axios from "axios";

export default function MovieGrid({isPopupVisible}:{isPopupVisible:boolean}){
    const [movies,setMovies] = useState([]); // movie data
    useEffect(() => {
        async function fetchMovies() {
            const api_key = process.env.API_KEY
            const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
            const options = {
                method: 'GET',
                headers : {
                    accept:"application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDdiZGE0ZGViOTBjYjEyMjg5YWZhNzA5NWZlM2JjOCIsIm5iZiI6MTc0MDE5MzQzMy43NTMsInN1YiI6IjY3YjkzZTk5YjdjMzU0NTlhZGJlOWI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvKxcBpv7alilMOrfhkvMwLRplmBiiyU0R-CeTYjCCo`
                }
            };
            const res = await fetch(url,options);
            const data = await res.json();
            const results = data.results;
            setMovies(results);
        }
        fetchMovies()                // The useEffect function

    }, [] );  // Empty dependency array only runs on first mount

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 ${isPopupVisible ? 'blur-sm' : ''}`}>
            {movies.map((movie:any) => (                  // Maps all the movies to render each specific one
                <MovieCard key={movie.id} movie={movie}/> // key and movie are props
            ))}
        </div>
    )
}
