"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RegistrationSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto redirect to review page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/registration/review")
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Farm Illustration */}
          <div className="flex flex-col items-center justify-center">
            <div className="max-w-md mb-6">
              <img src="/images/registration-success.png" alt="Success Illustration" className="w-full h-auto" />
            </div>
          </div>

          {/* Right side - Success Message */}
          <div className="flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Successful</h2>
                <p className="text-gray-600 max-w-md">You have successfully Registered into your account.</p>
              </div>

              {/* Auto redirect message */}
              <div className="text-sm text-gray-500">Redirecting to review page in 3 seconds...</div>

              {/* Manual redirect button */}
              <button
                onClick={() => navigate("/registration/review")}
                className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-colors font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationSuccess
