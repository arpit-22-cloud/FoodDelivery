import mongoose from "mongoose";

// Function to establish connection with MongoDB Atlas
export const connectDB = async () => {
    
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected")); // Log success message once connected
}