import mongoose from "mongoose";

// Function to establish connection with MongoDB Atlas
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB Connected")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    throw error
  }
}