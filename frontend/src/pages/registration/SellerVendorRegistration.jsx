"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { useDropzone } from "react-dropzone"
import { Plus, Upload } from "lucide-react"
import axios from "axios"

const SellerVendorRegistration = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()
  const [selectedProducts, setSelectedProducts] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState({
    licenses: [],
    certificates: [],
    businessDocuments: [],
  })

  const products = [
    { value: "drone-spraying", label: "Drone Spraying", icon: "🚁" },
    { value: "tractors", label: "Tractor Services", icon: "🚜" },
    { value: "harvesting", label: "Harvesting Machines", icon: "🌾" },
    { value: "soil-testing", label: "Soil Testing", icon: "🧪" },
    { value: "power-weeder", label: "Power Weeder", icon: "⚡" },
    { value: "manual-sprayer", label: "Manual Sprayer", icon: "💧" },
    { value: "thresher", label: "Thresher / Winnower", icon: "🌾" },
    { value: "biofertilizer", label: "Biofertilizer", icon: "🌱" },
    { value: "seeding-supply", label: "Seeding Supply", icon: "🌰" },
    { value: "irrigation", label: "Irrigation", icon: "⚖️" },
    { value: "custom-equipment", label: "Custom Equipment Fabrication", icon: "🔧" },
    { value: "farm-labour", label: "Farm Labour", icon: "👨‍🌾" },
    { value: "produce-collection", label: "Produce Collection & Transport", icon: "🚛" },
    { value: "crop-advisory", label: "Crop Advisory / Pesticides", icon: "📋" },
  ]

  const stateOptions = [
    { value: "maharashtra", label: "Maharashtra" },
    { value: "gujarat", label: "Gujarat" },
    { value: "punjab", label: "Punjab" },
    { value: "haryana", label: "Haryana" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
  ]

  const cityOptions = [
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "nashik", label: "Nashik" },
    { value: "nagpur", label: "Nagpur" },
  ]

  const onDrop = (acceptedFiles, fileType) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: [...prev[fileType], ...acceptedFiles],
    }))
  }

  const { getRootProps: getLicenseProps, getInputProps: getLicenseInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "licenses"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const { getRootProps: getCertificateProps, getInputProps: getCertificateInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "certificates"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const { getRootProps: getBusinessProps, getInputProps: getBusinessInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "businessDocuments"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      // Add form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })

      // Add selected products
      formData.append("products", JSON.stringify(selectedProducts))

      // Add files
      uploadedFiles.licenses.forEach((file) => formData.append("licenses", file))
      uploadedFiles.certificates.forEach((file) => formData.append("certificates", file))
      uploadedFiles.businessDocuments.forEach((file) => formData.append("businessDocuments", file))

      const response = await axios.post("/api/registration/seller-vendor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.success) {
        navigate("/registration/success")
      }
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Registration</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Farm Illustration */}
          <div className="flex flex-col items-center justify-center">
            <div className="max-w-md mb-6">
              <img src="/images/registration-main.png" alt="Farm Illustration" className="w-full h-auto" />
            </div>
            <p className="text-center text-gray-700 max-w-md">
              CHIRAG Connects: Bridging Innovation and Agriculture for a Sustainable Future.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Address line 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                />
                <input
                  type="text"
                  {...register("address2")}
                  placeholder="Address line 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* State and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <Select
                    options={stateOptions}
                    placeholder="Select State"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Select
                    options={cityOptions}
                    placeholder="Select City"
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>

              {/* Type of Products Sold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Products Sold</label>
                <Select
                  options={products}
                  placeholder="Select Product"
                  className="react-select-container mb-4"
                  classNamePrefix="react-select"
                />

                {/* Selected Products Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {products.slice(0, 12).map((product) => (
                    <div
                      key={product.value}
                      className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors ${
                        selectedProducts.includes(product.value) ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => {
                        if (selectedProducts.includes(product.value)) {
                          setSelectedProducts((prev) => prev.filter((p) => p !== product.value))
                        } else {
                          setSelectedProducts((prev) => [...prev, product.value])
                        }
                      }}
                    >
                      <div className="text-2xl mb-2">{product.icon}</div>
                      <div className="text-xs text-gray-600">{product.label}</div>
                    </div>
                  ))}
                </div>

                {/* Add buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus size={16} />
                    <span>Add Product</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Plus size={16} />
                    <span>Add Service</span>
                  </button>
                </div>
              </div>

              {/* Licenses/Certifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Licenses/Certifications (if any)</label>
                <p className="text-sm text-gray-500 mb-2">e.g., FPO license, Organic certificate, GST Number</p>
                <div
                  {...getLicenseProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <input {...getLicenseInputProps()} />
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-600">Upload Shop Images</p>
                </div>
                {uploadedFiles.licenses.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{uploadedFiles.licenses.length} file(s) uploaded</p>
                  </div>
                )}
              </div>

              {/* Upload Business Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Business Documents</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    {...getCertificateProps()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <input {...getCertificateInputProps()} />
                    <Plus className="mx-auto mb-2 text-gray-400" size={20} />
                    <p className="text-xs text-gray-600">Upload Aadhar Card</p>
                  </div>
                  <div
                    {...getBusinessProps()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <input {...getBusinessInputProps()} />
                    <Plus className="mx-auto mb-2 text-gray-400" size={20} />
                    <p className="text-xs text-gray-600">Business Registration</p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("acceptTerms", { required: "Please accept terms and conditions" })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  I confirm and accept the terms and conditions
                </label>
              </div>
              {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-900 transition-colors font-medium"
              >
                Save and Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerVendorRegistration
