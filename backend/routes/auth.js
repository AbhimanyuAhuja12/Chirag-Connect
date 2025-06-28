import express from "express"
import { body } from "express-validator"
import { sendOTP, verifyOTP } from "../controllers/authController.js"

const router = express.Router()

// Send OTP
router.post(
  "/send-otp",
  [
    body("mobile").isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits"),
    body("type").isIn(["login", "signup"]).withMessage("Type must be login or signup"),
  ],
  sendOTP,
)

// Verify OTP
router.post(
  "/verify-otp",
  [
    body("mobile").isLength({ min: 10, max: 10 }).withMessage("Mobile number must be 10 digits"),
    body("otp").isLength({ min: 4, max: 4 }).withMessage("OTP must be 4 digits"),
    body("type").isIn(["login", "signup"]).withMessage("Type must be login or signup"),
  ],
  verifyOTP,
)

export default router
