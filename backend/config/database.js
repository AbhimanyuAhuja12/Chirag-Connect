import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "chirag_connect",
}

let db

export async function initDB() {
  try {
    db = await mysql.createConnection(dbConfig)
    console.log("Connected to MySQL database")
    await createTables()
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

export function getDB() {
  return db
}

async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(15) UNIQUE NOT NULL,
      email VARCHAR(255),
      name VARCHAR(255),
      password VARCHAR(255),
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `

  const createOTPTable = `
    CREATE TABLE IF NOT EXISTS otp_codes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(15) NOT NULL,
      otp VARCHAR(6) NOT NULL,
      type ENUM('login', 'signup') NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      is_used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `

  const createRegistrationsTable = `
    CREATE TABLE IF NOT EXISTS registrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      registration_type ENUM('service-vendor', 'seller-vendor', 'delivery-partner') NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      address TEXT,
      address2 TEXT,
      state VARCHAR(100),
      city VARCHAR(100),
      data JSON,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `

  const createRegistrationFilesTable = `
    CREATE TABLE IF NOT EXISTS registration_files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      registration_id INT NOT NULL,
      file_type VARCHAR(100) NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
    )
  `

  try {
    await db.execute(createUsersTable)
    await db.execute(createOTPTable)
    await db.execute(createRegistrationsTable)
    await db.execute(createRegistrationFilesTable)
    console.log("Database tables created successfully")
  } catch (error) {
    console.error("Error creating tables:", error)
    throw error
  }
}
