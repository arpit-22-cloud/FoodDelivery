import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer"; // Middleware for handling file uploads

const foodRouter = express.Router(); 

// Configuration for Multer Image Storage Engine 
const storage = multer.diskStorage({
    destination: "uploads", // Folder where images are saved 
    filename: (req, file, cb) => {
        // Creates a unique filename using a timestamp + original name 
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage }); 

// API Endpoints 
// POST: Adds food and handles single image upload under the 'image' field 
foodRouter.post("/add", upload.single("image"), addFood); 

// GET: Retrieves the full list of food items 
foodRouter.get("/list", listFood); 

// POST: Removes a food item using its ID passed in the request body 
foodRouter.post("/remove", removeFood); 

export default foodRouter; 