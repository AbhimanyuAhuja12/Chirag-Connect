import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { getDB } from "../config/database.js"
import { generateOTP, sendOTPSMS } from "../utils/otp.js"

export async function sendOTP(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      })
    }

    const { mobile, type, email, name } = req.body
    const db = getDB()

    // For login, check if user exists
    if (type === "login") {
      const [users] = await db.execute("SELECT * FROM users WHERE mobile = ?", [mobile])
      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found. Please sign up first.",
        })
      }
    }

    // For signup, check if user already exists
    if (type === "signup") {
      const [users] = await db.execute("SELECT * FROM users WHERE mobile = ?", [mobile])
      if (users.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User already exists. Please login instead.",
        })
      }
    }

    // Development mode: Use fixed OTP 1234
    const otp = process.env.NODE_ENV === "production" ? generateOTP() : "1234"
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    // Save OTP to database
    await db.execute("INSERT INTO otp_codes (mobile, otp, type, expires_at) VALUES (?, ?, ?, ?)", [
      mobile,
      otp,
      type,
      expiresAt,
    ])

    // Send OTP (mock implementation)
    await sendOTPSMS(mobile, otp)

    res.json({
      success: true,
      message: "OTP sent successfully",
      // In development, return the OTP for easy testing
      ...(process.env.NODE_ENV !== "production" && { otp: otp }),
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export async function verifyOTP(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      })
    }

    const { mobile, otp, type, email, name } = req.body
    const db = getDB()

    // Find valid OTP
    const [otpRecords] = await db.execute(
      `SELECT * FROM otp_codes 
       WHERE mobile = ? AND otp = ? AND type = ? AND expires_at > NOW() AND is_used = FALSE 
       ORDER BY created_at DESC LIMIT 1`,
      [mobile, otp, type],
    )

    if (otpRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      })
    }

    // Mark OTP as used
    await db.execute("UPDATE otp_codes SET is_used = TRUE WHERE id = ?", [otpRecords[0].id])

    let user

    if (type === "signup") {
      // Create new user
      const [result] = await db.execute("INSERT INTO users (mobile, email, name, is_verified) VALUES (?, ?, ?, TRUE)", [
        mobile,
        email || null,
        name || null,
      ])

      user = {
        id: result.insertId,
        mobile,
        email: email || null,
        name: name || null,
        is_verified: true,
      }
    } else {
      // Get existing user and mark as verified
      await db.execute("UPDATE users SET is_verified = TRUE WHERE mobile = ?", [mobile])

      const [users] = await db.execute("SELECT * FROM users WHERE mobile = ?", [mobile])
      user = users[0]
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, mobile: user.mobile }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    })

    res.json({
      success: true,
      message: "OTP verified successfully",
      user: {
        id: user.id,
        mobile: user.mobile,
        email: user.email,
        name: user.name,
        is_verified: user.is_verified,
      },
      token,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
