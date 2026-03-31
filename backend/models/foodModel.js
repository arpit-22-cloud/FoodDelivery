import mongoose from "mongoose";

// Defining the schema for food products
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
})

// Creating or reusing the model
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;