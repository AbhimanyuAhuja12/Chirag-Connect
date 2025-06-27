"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { useDropzone } from "react-dropzone"
import { Plus } from "lucide-react"
import axios from "axios"

const DeliveryPartnerRegistration = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [uploadedFiles, setUploadedFiles] = useState({
    license: [],
    vehicleDocuments: [],
    identityProof: [],
  })

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
    onDrop: (files) => onDrop(files, "license"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const { getRootProps: getVehicleProps, getInputProps: getVehicleInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "vehicleDocuments"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const { getRootProps: getIdentityProps, getInputProps: getIdentityInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "identityProof"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      "application/pdf": [".pdf"],
    },
  })

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })

      uploadedFiles.license.forEach((file) => formData.append("license", file))
      uploadedFiles.vehicleDocuments.forEach((file) => formData.append("vehicleDocuments", file))
      uploadedFiles.identityProof.forEach((file) => formData.append("identityProof", file))

      const response = await axios.post("/api/registration/delivery-partner", formData, {
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

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driving License Number</label>
                <input
                  type="text"
                  {...register("licenseNumber", { required: "License number is required" })}
                  placeholder="Enter Driving License Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>}
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <input
                  type="text"
                  {...register("vehicleType")}
                  placeholder="e.g., Bike, Auto, Pickup Truck, Other"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                <input
                  type="text"
                  {...register("vehicleNumber")}
                  placeholder="Enter Vehicle Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Service Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
                <input
                  type="text"
                  {...register("serviceArea")}
                  placeholder="Enter service area coverage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Upload Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Upload Documents</label>

                <div className="space-y-4">
                  {/* Driving License */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Upload Driving License</p>
                    <div
                      {...getLicenseProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input {...getLicenseInputProps()} />
                      <Plus className="mx-auto mb-2 text-gray-400" size={20} />
                      <p className="text-xs text-gray-600">Upload License</p>
                    </div>
                    {uploadedFiles.license.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">{uploadedFiles.license.length} file(s) uploaded</p>
                    )}
                  </div>

                  {/* Vehicle Documents */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Upload Vehicle Documents</p>
                    <div
                      {...getVehicleProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input {...getVehicleInputProps()} />
                      <Plus className="mx-auto mb-2 text-gray-400" size={20} />
                      <p className="text-xs text-gray-600">Vehicle Registration</p>
                    </div>
                    {uploadedFiles.vehicleDocuments.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        {uploadedFiles.vehicleDocuments.length} file(s) uploaded
                      </p>
                    )}
                  </div>

                  {/* Identity Proof */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Upload Identity Proof</p>
                    <div
                      {...getIdentityProps()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input {...getIdentityInputProps()} />
                      <Plus className="mx-auto mb-2 text-gray-400" size={20} />
                      <p className="text-xs text-gray-600">Aadhar Card</p>
                    </div>
                    {uploadedFiles.identityProof.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        {uploadedFiles.identityProof.length} file(s) uploaded
                      </p>
                    )}
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

export default DeliveryPartnerRegistration
