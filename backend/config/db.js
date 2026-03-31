import mongoose from "mongoose";

// Function to establish connection with MongoDB Atlas
export const connectDB = async () => {
    
    await mongoose.connect('mongodb+srv://ZippyBite:ZippyBite123@cluster0.yfgwlll.mongodb.net/ZippyBite')
    .then(() => console.log("DB Connected")); // Log success message once connected
}