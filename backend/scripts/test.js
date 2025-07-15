import getMovies from "../scripts/importMovies.js";
import connectDB from "../config/configMongoDB.js";

(async () => {
  try {
    await connectDB();
    await getMovies(1);
    console.log("Movie import completed successfully.");
    process.exit(0); // clean exit
  } catch (error) {
    console.error("Movie import failed:", error);
    process.exit(1); // failure exit
  }
})();
