import express from "express"
import multer from "multer"
import { body } from "express-validator"
import {
  registerServiceVendor,
  registerSellerVendor,
  registerDeliveryPartner,
} from "../controllers/registrationController.js"
import { authenticateToken, optionalAuth } from "../middleware/auth.js"

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop())
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

// Use optionalAuth in development for easier testing
const authMiddleware = process.env.NODE_ENV === "production" ? authenticateToken : optionalAuth

// Service Vendor Registration
router.post(
  "/service-vendor",
  authMiddleware,
  upload.fields([
    { name: "licenses", maxCount: 5 },
    { name: "certificates", maxCount: 5 },
  ]),
  [body("fullName").notEmpty().withMessage("Full name is required")],
  registerServiceVendor,
)

// Seller Vendor Registration
router.post(
  "/seller-vendor",
  authMiddleware,
  upload.fields([
    { name: "licenses", maxCount: 5 },
    { name: "certificates", maxCount: 5 },
    { name: "businessDocuments", maxCount: 5 },
  ]),
  [body("fullName").notEmpty().withMessage("Full name is required")],
  registerSellerVendor,
)

// Delivery Partner Registration
router.post(
  "/delivery-partner",
  authMiddleware,
  upload.fields([
    { name: "license", maxCount: 2 },
    { name: "vehicleDocuments", maxCount: 3 },
    { name: "identityProof", maxCount: 2 },
  ]),
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("licenseNumber").notEmpty().withMessage("License number is required"),
  ],
  registerDeliveryPartner,
)

export default router
