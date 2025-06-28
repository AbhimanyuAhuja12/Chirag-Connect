import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "chirag_connect",
}

async function seedTestData() {
  let db
  try {
    db = await mysql.createConnection(dbConfig)
    console.log("Connected to database for seeding...")

    // Insert test user
    await db.execute(
      `INSERT IGNORE INTO users (id, mobile, email, name, is_verified) 
       VALUES (1, '9876543210', 'test@example.com', 'Test User', TRUE)`,
    )

    console.log("✅ Test data seeded successfully!")
    console.log("📱 Test mobile: 9876543210")
    console.log("🔐 Development OTP: 1234")
  } catch (error) {
    console.error("❌ Error seeding test data:", error)
  } finally {
    if (db) {
      await db.end()
    }
  }
}

seedTestData()
