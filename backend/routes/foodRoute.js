import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer"; // Middleware for handling file uploads

const foodRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

// API Endpoints
// POST: Adds food and handles single image upload under the 'image' field
foodRouter.post("/add", upload.single("image"), addFood);

// GET: Retrieves the full list of food items
foodRouter.get("/list", listFood);

// POST: Removes a food item using its ID passed in the request body
foodRouter.post("/remove", removeFood);

export default foodRouter; 