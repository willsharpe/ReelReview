"use client";

import { useState } from "react";
import { Star, StarHalf, Star as StarFilled, Eye, EyeOff, Heart, HeartOff, BookmarkPlus, BookmarkCheck } from "lucide-react";

function UserActions({ ID }:{ ID:string }) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [message,setMessage] = useState("");

  const handleRating = (value: number) => {
    setRating(value);
  };

  async function handleWatchlist() {
  const token = localStorage.getItem("jwt"); 

  const res = await fetch(`http://localhost:5000/api/user/watchlist/${ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), 
    },

  });

  const data = await res.json();
  console.log(data);
  setMessage(data.message);

  if (res.ok) {
    setWatched(true);
  }
}

  return (
    <div className="w-full max-w-md p-6 bg-base-200 rounded-xl shadow-xl flex flex-col gap-4">

      <div className="flex gap-3">
        <button
          onClick={handleWatchlist}
          className="btn btn-outline btn-sm"
        >
          {inWatchlist ? (
            <>
              <BookmarkCheck className="w-4 h-4" />
              In Watchlist
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4" />
              Add to Watchlist
            </>
          )}
        </button>

        <button
          onClick={() => setWatched(!watched)}
          className={`btn btn-sm ${watched ? "btn-success" : "btn-outline"}`}
        >
          {watched ? (
            <>
              <Eye className="w-4 h-4" />
              Watched
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              Mark as Watched
            </>
          )}
        </button>

        <button
          onClick={() => setLiked(!liked)}
          className={`btn btn-sm ${liked ? "btn-error text-white" : "btn-outline"}`}
        >
          {liked ? (
            <>
              <Heart className="w-4 h-4 fill-current" />
              Liked
            </>
          ) : (
            <>
              <HeartOff className="w-4 h-4" />
              Like
            </>
          )}
        </button>
      </div>

      <div>
        <p className="mb-1 text-sm text-base-content/70">Your Rating:</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRating(star)}
              className="hover:scale-110 transition-transform"
            >
              <Star
                className={`w-6 h-6 ${
                  rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                }`}
                fill={rating >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserActions