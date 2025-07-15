import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  released: {
    type: String, 
    required: true,
  },
  runtime: {
    type: String,
  },
  genre: {
    type: [String],
  },
  plot: {
    type: String,
  },
  poster: {
    type: String,
  },
  tmdbID: {
    type: String,
    required:true,
    unique: true,
  },
  imdbID: {
    type: String,
  },
  language: {
    type: String,
  },
  country: {
    type: [String],
  },
  director: {
    type: String,
  },
  cast: [{
    type: String,
  }],
  popularity: {
    type: Number,
  },
  voteAverage: {
    type: Number,
    required:true
  },
  voteCount: {
    type: Number,
  }
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
