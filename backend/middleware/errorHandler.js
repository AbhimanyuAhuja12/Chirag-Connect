export function errorHandler(err, req, res, next) {
    console.error(err.stack)
  
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON payload",
      })
    }
  
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size too large",
      })
    }
  
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
  