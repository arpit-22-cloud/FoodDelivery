import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

// Route for account registration 
userRouter.post("/register", registerUser);

// Route for user login 
userRouter.post("/login", loginUser);

export default userRouter;