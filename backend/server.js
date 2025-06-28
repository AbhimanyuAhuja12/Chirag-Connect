import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import registrationRoutes from "./routes/registration.js"
import userRoutes from "./routes/user.js"
import { initDB } from "./config/database.js"
import { errorHandler } from "./middleware/errorHandler.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/registration", registrationRoutes)
app.use("/api/user", userRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running", timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use(errorHandler)

// Start server
async function startServer() {
  try {
    await initDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
