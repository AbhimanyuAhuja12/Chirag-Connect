import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    })
  }

  jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      })
    }
    req.user = user
    next()
  })
}

// Optional auth middleware for development
export function optionalAuth(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, user) => {
      if (!err) {
        req.user = user
      }
    })
  }
  next()
}
