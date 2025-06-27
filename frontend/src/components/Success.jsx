"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Success = ({ authFlow }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!authFlow.mobile || authFlow.step !== "success") {
      navigate("/login")
      return
    }

    // Auto redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/dashboard")
    }, 3000)

    return () => clearTimeout(timer)
  }, [authFlow, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md">
          <img src="/images/success-illustration.png" alt="Success Illustration" className="w-full h-auto" />
        </div>
      </div>

      {/* Right side - Success Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {authFlow.type === "login" ? "Login Successful" : "Sign up Successful"}
            </h2>
            <p className="text-gray-600">You have successfully logged into your admin account.</p>
          </div>

          {/* Auto redirect message */}
          <div className="text-sm text-gray-500">Redirecting to dashboard in 3 seconds...</div>

          {/* Manual redirect button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default Success
