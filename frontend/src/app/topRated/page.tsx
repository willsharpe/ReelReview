"use client";
import { useEffect,useState } from "react";
import MovieCard from "../components/MovieCard";
import { Roboto_Mono } from "next/font/google";
import { motion, useMotionValue } from "framer-motion";
import NavBar from "../components/NavBar";
import SignInCard from "../components/SignInCard";
import MovieIcon from "../components/MovieIcon";
import SignUpCard from "../components/SignUpCard";
const roboto = Roboto_Mono({
    subsets:["latin"],
    weight:"400",
});


function TopRated(){
    const [movies,setMovies] = useState<any[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState<"signin" | "signup" | null>(null);
    const [loggedIn,setLoggedIn] = useState(false);


    const handleSignInClick = () => setPopupType("signin");
    const handleSignUpClick = () => setPopupType("signup");
    const handleClosePopup = () => setPopupType(null);

    useEffect(() => {
        async function fetchTopRated() {
            const results = [];
            for (let i=1;i<=4;i++){
                const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${i}`;
                const options = {
                    method:"GET",
                    headers:{
                        accept:'application/json',
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDdiZGE0ZGViOTBjYjEyMjg5YWZhNzA5NWZlM2JjOCIsIm5iZiI6MTc0MDE5MzQzMy43NTMsInN1YiI6IjY3YjkzZTk5YjdjMzU0NTlhZGJlOWI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvKxcBpv7alilMOrfhkvMwLRplmBiiyU0R-CeTYjCCo"
                    },
                };
                const res = await fetch(url,options);
                const data = await res.json();
                results.push(...data.results);

            }
            console.log(results);
            setMovies(results);
           
        }
        fetchTopRated()
    },[])
    return(
        <>
 
        <NavBar onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} loggedIn={loggedIn} />
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
        viewport={{ once: true }}
        className={`text-center py-0 text-4xl font-bold my-10 ${roboto.className}`}
      >
        Top Rated Films
        </motion.div>
        <motion.div
                initial= {{opacity:0,scale:0.95 }}
                whileInView={{ opacity: 1, scale:1}}
                transition={{ duration: 1.0}}
                viewport={{ once:true}}
                className="container mx-auto px-4">
                 <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 ${popupType ? 'blur-sm' : ''}`}>
                    {movies.map(movie =>(
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
                </div>
        </motion.div>
       
        {popupType === "signin" && <SignInCard onClose={handleClosePopup} setLoggedIn={setLoggedIn}/>}
        {popupType === "signup" && <SignUpCard onClose={handleClosePopup} />}
        </>

    )
}

export default TopRated