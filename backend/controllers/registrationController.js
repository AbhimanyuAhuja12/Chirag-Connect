import { validationResult } from "express-validator"
import { getDB } from "../config/database.js"

export async function registerServiceVendor(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      })
    }

    const { fullName, address, address2, state, city, serviceArea, equipmentDetails, services } = req.body
    // Use dummy user ID in development if no user is authenticated
    const userId = req.user?.userId || 1
    const db = getDB()

    // Parse services if it's a string
    let parsedServices = []
    if (services) {
      parsedServices = typeof services === "string" ? JSON.parse(services) : services
    }

    const registrationData = {
      services: parsedServices,
      serviceArea,
      equipmentDetails,
    }

    // Insert registration
    const [result] = await db.execute(
      `INSERT INTO registrations (user_id, registration_type, full_name, address, address2, state, city, data) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, "service-vendor", fullName, address, address2, state, city, JSON.stringify(registrationData)],
    )

    const registrationId = result.insertId

    // Handle file uploads
    if (req.files) {
      const fileInserts = []

      if (req.files.licenses) {
        req.files.licenses.forEach((file) => {
          fileInserts.push([registrationId, "license", file.originalname, file.path])
        })
      }

      if (req.files.certificates) {
        req.files.certificates.forEach((file) => {
          fileInserts.push([registrationId, "certificate", file.originalname, file.path])
        })
      }

      if (fileInserts.length > 0) {
        await db.execute(
          `INSERT INTO registration_files (registration_id, file_type, file_name, file_path) VALUES ${fileInserts.map(() => "(?, ?, ?, ?)").join(", ")}`,
          fileInserts.flat(),
        )
      }
    }

    res.json({
      success: true,
      message: "Service vendor registration submitted successfully",
      registrationId,
    })
  } catch (error) {
    console.error("Service vendor registration error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export async function registerSellerVendor(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      })
    }

    const { fullName, address, address2, state, city, products } = req.body
    // Use dummy user ID in development if no user is authenticated
    const userId = req.user?.userId || 1
    const db = getDB()

    // Parse products if it's a string
    let parsedProducts = []
    if (products) {
      parsedProducts = typeof products === "string" ? JSON.parse(products) : products
    }

    const registrationData = {
      products: parsedProducts,
    }

    // Insert registration
    const [result] = await db.execute(
      `INSERT INTO registrations (user_id, registration_type, full_name, address, address2, state, city, data) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, "seller-vendor", fullName, address, address2, state, city, JSON.stringify(registrationData)],
    )

    const registrationId = result.insertId

    // Handle file uploads
    if (req.files) {
      const fileInserts = []

      if (req.files.licenses) {
        req.files.licenses.forEach((file) => {
          fileInserts.push([registrationId, "license", file.originalname, file.path])
        })
      }

      if (req.files.certificates) {
        req.files.certificates.forEach((file) => {
          fileInserts.push([registrationId, "certificate", file.originalname, file.path])
        })
      }

      if (req.files.businessDocuments) {
        req.files.businessDocuments.forEach((file) => {
          fileInserts.push([registrationId, "business_document", file.originalname, file.path])
        })
      }

      if (fileInserts.length > 0) {
        await db.execute(
          `INSERT INTO registration_files (registration_id, file_type, file_name, file_path) VALUES ${fileInserts.map(() => "(?, ?, ?, ?)").join(", ")}`,
          fileInserts.flat(),
        )
      }
    }

    res.json({
      success: true,
      message: "Seller vendor registration submitted successfully",
      registrationId,
    })
  } catch (error) {
    console.error("Seller vendor registration error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export async function registerDeliveryPartner(req, res) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      })
    }

    const { fullName, address, address2, state, city, licenseNumber, vehicleType, vehicleNumber, serviceArea } =
      req.body
    // Use dummy user ID in development if no user is authenticated
    const userId = req.user?.userId || 1
    const db = getDB()

    const registrationData = {
      licenseNumber,
      vehicleType,
      vehicleNumber,
      serviceArea,
    }

    // Insert registration
    const [result] = await db.execute(
      `INSERT INTO registrations (user_id, registration_type, full_name, address, address2, state, city, data) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, "delivery-partner", fullName, address, address2, state, city, JSON.stringify(registrationData)],
    )

    const registrationId = result.insertId

    // Handle file uploads
    if (req.files) {
      const fileInserts = []

      if (req.files.license) {
        req.files.license.forEach((file) => {
          fileInserts.push([registrationId, "driving_license", file.originalname, file.path])
        })
      }

      if (req.files.vehicleDocuments) {
        req.files.vehicleDocuments.forEach((file) => {
          fileInserts.push([registrationId, "vehicle_document", file.originalname, file.path])
        })
      }

      if (req.files.identityProof) {
        req.files.identityProof.forEach((file) => {
          fileInserts.push([registrationId, "identity_proof", file.originalname, file.path])
        })
      }

      if (fileInserts.length > 0) {
        await db.execute(
          `INSERT INTO registration_files (registration_id, file_type, file_name, file_path) VALUES ${fileInserts.map(() => "(?, ?, ?, ?)").join(", ")}`,
          fileInserts.flat(),
        )
      }
    }

    res.json({
      success: true,
      message: "Delivery partner registration submitted successfully",
      registrationId,
    })
  } catch (error) {
    console.error("Delivery partner registration error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
