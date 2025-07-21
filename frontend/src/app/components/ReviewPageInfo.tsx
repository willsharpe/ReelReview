"use client";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Spectral } from "next/font/google";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import UserActions from "./UserActions";

const spectral = Spectral({
  subsets: ["latin"],
  weight:['700']
});
function ReviewPageInfo({ movieID }: { movieID: string }) {



  const [movieData, setMovieData] = useState<any>(null);
  const [reviews,setReviews] = useState([]);




  function renderStars(rating: number) {
    const stars = [];
    const starCount = Math.floor(rating / 2); // Convert to 0-5 scale
    const hasHalfStar = rating % 2 >= 1;

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<FaStar key={i} className="text-green-400" />);
      } else if (i === starCount && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-green-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-500" />);
      }
    }

    return stars;
  }


  useEffect(() => {
    async function getReviews() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/reviews?language=en-US&page=1`,
        {
          headers:{
          accept:'application/json',
          Authorization:`Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDdiZGE0ZGViOTBjYjEyMjg5YWZhNzA5NWZlM2JjOCIsIm5iZiI6MTc0MDE5MzQzMy43NTMsInN1YiI6IjY3YjkzZTk5YjdjMzU0NTlhZGJlOWI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvKxcBpv7alilMOrfhkvMwLRplmBiiyU0R-CeTYjCCo`
          },
        }
      )
      const data = await res.json();
      setReviews(data.results);
    }
    getReviews()
  }, [movieID]);

  useEffect(() => {
    async function getInfo() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDdiZGE0ZGViOTBjYjEyMjg5YWZhNzA5NWZlM2JjOCIsIm5iZiI6MTc0MDE5MzQzMy43NTMsInN1YiI6IjY3YjkzZTk5YjdjMzU0NTlhZGJlOWI0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvKxcBpv7alilMOrfhkvMwLRplmBiiyU0R-CeTYjCCo`,
          },
        }
      );
      const data = await res.json();
      setMovieData(data);
    }

    getInfo();
  }, [movieID]);

  if (!movieData) return <p className="text-white p-8">Loading...</p>;

  return (
    <>
      
      <div className={`bg-slate-900 min-h-screen text-white ${spectral.className}`}>
        <NavBar onSignInClick={() => {}} onSignUpClick={() => {}} />
          <div className="flex justify-center">
            <div className=" mask-l-from-80% mask-l-to 90% mask-t-from-80% mask-t-to 90% mask-r-from-80% mask-r-to 90% mask-b-from-80% mask-b-to 90%  relative h-[500px] w-[1500px] bg-top bg-cover" style={{ backgroundImage:`url(https://image.tmdb.org/t/p/w500/${movieData.backdrop_path})`, backgroundPosition:'center center'}}></div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 p-8 max-w-6xl mx-auto mt-[-80px]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
              alt={movieData.title}
              className="w-[250px] h-auto rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-2">{movieData.title}</h1>
              <p className="text-gray-400 mb-2 italic">
                {movieData.tagline || "No tagline available"}
              </p>
              <p className="text-m mb-2">
                <strong>Release Date:</strong> {movieData.release_date}
              </p>
              <p className="text-m mb-2">
                <strong>Runtime:</strong> {movieData.runtime} min
              </p>
              <p className="text-m mb-2">
                <strong>Rating:</strong> {(movieData.vote_average / 2).toFixed(1)} / 5
              </p>
              <p className="text-m mb-2">
                <strong>Genres:</strong>{" "}
                {movieData.genres?.map((g: any) => g.name).join(", ")}
              </p>
              <UserActions ID={movieID}/>
            </div>
          </div>
    
        

        {/* Overview */}
        <div className="max-w-4xl mx-auto px-8 mt-6">
          <h2 className="text-3xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{movieData.overview}</p>
        </div>

        {/* Placeholder for user reviews */}
        <div className="max-w-4xl mx-auto px-8 mt-10">
          <h2 className="text-2xl font-semibold mb-4">Popular Reviews</h2>
          <div className="space-y-4">
            {reviews?.map((review:any) => (
              <div
                key={review.id}
                className="bg-gray-700 p-4 rounded shadow text-sm text-gray-300"
              >
                <div className="flex items-center gap-2 mb-2">
            
                  <span className="text-white font-medium">Review by: {review.author}</span>
                  <span className="flex items-center text-sm gap-1 ">{renderStars(review.author_details.rating)}</span>
                </div>
                <p>
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
    </div>

    </>
  );
}

export default ReviewPageInfo;
