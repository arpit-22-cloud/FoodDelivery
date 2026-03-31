import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

const streamUpload = (buffer) => new Promise((resolve, reject) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);

  const stream = cloudinary.uploader.upload_stream(
    { folder: "food_delivery" },
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }
  );

  readable.pipe(stream);
});

// Logic to add a new food item 
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }

    try {
        const uploadResult = await streamUpload(req.file.buffer);

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: uploadResult.secure_url,
            cloudinary_id: uploadResult.public_id
        });

        await food.save(); // Saves the item to MongoDB 
        res.json({ success: true, message: "Food Added", data: food }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error uploading image" }); 
    }
};

// Logic to fetch all food items for display 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}); // Retrieves all documents from the collection 
        res.json({ success: true, data: foods }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" }); 
    }
};

// Logic to remove a food item and its image 
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        if (food.cloudinary_id) {
            await cloudinary.uploader.destroy(food.cloudinary_id);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" }); 
    }
};

export { addFood, listFood, removeFood }; 