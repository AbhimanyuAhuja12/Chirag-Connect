import express from "express"
import { getUserProfile } from "../controllers/userController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get user profile
router.get("/profile", authenticateToken, getUserProfile)

export default router
