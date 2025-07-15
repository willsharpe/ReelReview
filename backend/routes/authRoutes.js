import express from "express";
import { loginUser,registerUser,deleteUser } from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authmiddleware.js";



const router=express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser);
router.delete("/user",authMiddleware,deleteUser);

export default router;