import Link from "next/link";
import { Syne_Mono } from "next/font/google";
import { BsFillEyeFill } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";

const roboto = Syne_Mono({
  subsets: ["latin"],
  weight: "400",
});

function MovieCard({ movie }: { movie: any }) {
  return (
    <div
      className={`relative group w-full h-[375px] overflow-hidden rounded-lg shadow-md cursor-pointer ${roboto.className}`}
    >
      <Link href={`/film/${movie.id}`} className="block w-full h-full">

        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />


        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 z-10" />


        <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <div className="flex flex-col items-center space-y-2">
            <BsFillEyeFill size={40} className="text-green-400" />
            <span>{movie.popularity}</span>
            <GoHeartFill size={40} className="text-orange-400" />
            <span>{movie.vote_count}</span>
          </div>
        </div>


        <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center text-sm py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {movie.title} {`${movie.release_date}`.split("-", 1)}{" "}
          {(movie.vote_average / 2).toFixed(1)}
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
