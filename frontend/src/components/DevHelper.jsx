"use client"

import { useState } from "react"

const DevHelper = () => {
  const [isVisible, setIsVisible] = useState(false)

  const quickLogin = async () => {
    try {
      // Quick signup with test data
      const signupResponse = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: "9876543210",
          email: "test@example.com",
          name: "Test User",
          type: "signup",
        }),
      })

      if (signupResponse.ok) {
        // Verify with development OTP
        const verifyResponse = await fetch("http://localhost:5000/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: "9876543210",
            otp: "1234",
            type: "signup",
            email: "test@example.com",
            name: "Test User",
          }),
        })

        const data = await verifyResponse.json()
        if (data.success) {
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          window.location.href = "/dashboard"
        }
      }
    } catch (error) {
      console.error("Quick login error:", error)
    }
  }

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        title="Development Helper"
      >
        🛠️
      </button>

      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64">
          <h3 className="font-semibold text-gray-900 mb-3">Development Helper</h3>

          <div className="space-y-2">
            <button
              onClick={quickLogin}
              className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700"
            >
              Quick Login (Test User)
            </button>

            <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
              <p>
                <strong>Development OTP:</strong> 1234
              </p>
              <p>
                <strong>Test Mobile:</strong> 9876543210
              </p>
            </div>

            <div className="text-xs text-gray-500">
              <p>• Use any 10-digit mobile number</p>
              <p>• OTP is always 1234 in dev mode</p>
              <p>• Registration works without auth</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevHelper
