import express from "express";
import cors from "cors";
import connectDB from "./config/configMongoDB.js";
import dotenv from "dotenv";
import getMovies from "./scripts/importMovies.js";
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import User from "./models/Users.js";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
const app=express();
const port =5000;



app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`);
    });
})

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/movies",movieRoutes);

