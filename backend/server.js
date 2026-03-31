import 'dotenv/config'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// App Config 
const app = express()

// Middleware 
app.use(express.json()) // Parses incoming requests with JSON payloads 
app.use(cors()) // Enables Cross-Origin Resource Sharing for frontend access 

// DB Connection 
connectDB();

// API Endpoints 
app.use("/api/food", foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Health Check Route 
app.get("/", (req, res) => {
    res.send("API Working")
})

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 4000
  app.listen(port, () => {
    console.log(`Server Started on ${port}`)
  })
}

export default app