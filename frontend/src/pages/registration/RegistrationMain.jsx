"use client"

import { useNavigate } from "react-router-dom"

const RegistrationMain = () => {
  const navigate = useNavigate()

  const registrationTypes = [
    {
      id: "service-vendor",
      title: "Service Vendor",
      description: "Register as Service Vendor",
      icon: "🛒",
      path: "/registration/service-vendor",
    },
    {
      id: "seller-vendor",
      title: "Seller Vendor",
      description: "Register as Vendor Seller",
      icon: "🏪",
      path: "/registration/seller-vendor",
    },
    {
      id: "delivery-partner",
      title: "Delivery Partners",
      description: "Register as Delivery Partners",
      icon: "🚚",
      path: "/registration/delivery-partner",
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Registration</h1>

        {/* Registration Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {registrationTypes.map((type) => (
            <div key={type.id} className="text-center">
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <button
                  onClick={() => navigate(type.path)}
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Farm Illustration */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-6">
            <img src="/images/registration-main.png" alt="Farm Illustration" className="w-full h-auto" />
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              CHIRAG Connects: Bridging Innovation and Agriculture for a Sustainable Future.
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationMain
