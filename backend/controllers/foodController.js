import foodModel from "../models/foodModel.js";
import fs from "fs"; // Node.js file system to handle image deletion

// Logic to add a new food item 
const addFood = async (req, res) => {
    // Stores the name of the uploaded image file 
    let image_filename = `${req.file.filename}`;

    // Creates a new food object with data from the request body 
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save(); // Saves the item to MongoDB 
        res.json({ success: true, message: "Food Added" }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); 
    }
};

// Logic to fetch all food items for display 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({}); // Retrieves all documents from the collection 
        res.json({ success: true, data: foods }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); 
    }
};

// Logic to remove a food item and its image 
const removeFood = async (req, res) => {
    try {
        // Finds the food item to get the image filename 
        const food = await foodModel.findById(req.body.id);
        
        // Deletes the image file from the 'uploads' folder 
        fs.unlink(`uploads/${food.image}`, () => {});

        // Deletes the document from the database 
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" }); 
    }
};

export { addFood, listFood, removeFood }; 