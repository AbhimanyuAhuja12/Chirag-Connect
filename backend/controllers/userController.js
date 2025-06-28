import { getDB } from "../config/database.js"

export async function getUserProfile(req, res) {
  try {
    const userId = req.user.userId
    const db = getDB()

    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [userId])

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const user = users[0]
    res.json({
      success: true,
      user: {
        id: user.id,
        mobile: user.mobile,
        email: user.email,
        name: user.name,
        is_verified: user.is_verified,
      },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
