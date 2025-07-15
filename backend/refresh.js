// refreshMovies.js

import dotenv from "dotenv";
import connectDB from "./config/configMongoDB.js";
import Movie from "./models/movies.js";
import getMovies from "./scripts/importMovies.js";

dotenv.config();

async function refresh() {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    await Movie.deleteMany({});
    console.log("Deleted existing movies");

    await getMovies(); // your import function
    console.log("Successfully reimported movies");

    process.exit(0);
  } catch (error) {
    console.error("Error refreshing movies:", error);
    process.exit(1);
  }
}

refresh();
