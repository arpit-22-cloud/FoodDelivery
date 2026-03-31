import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// App Config 
const app = express()
const port =process.env.PORT|| 4000

// Middleware 
app.use(express.json()) // Parses incoming requests with JSON payloads 
app.use(cors()) // Enables Cross-Origin Resource Sharing for frontend access 

// DB Connection 
connectDB();
app.get('/', (req, res) => res.send('API is working')) 

// API Endpoints 
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads')) // Exposes the uploads folder for image access 
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Health Check Route 
app.get("/", (req, res) => {
    res.send("API Working")
})

// Start Server 
app.listen(port, () => {
    console.log(`Server Started on ${port}`)
})