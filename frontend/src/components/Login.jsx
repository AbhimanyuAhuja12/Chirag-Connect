"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ authFlow, setAuthFlow }) => {
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!mobile.trim()) {
      setError("Please enter mobile number")
      return
    }

    if (mobile.length !== 10) {
      setError("Please enter valid mobile number")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, type: "login" }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthFlow({
          type: "login",
          mobile,
          email: "",
          name: "",
          step: "otp",
        })
        navigate("/verify-otp")
      } else {
        setError(data.message || "Failed to send OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md">
          <img src="/images/login-illustration.png" alt="Chirag Connect Illustration" className="w-full h-auto" />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="text-2xl font-bold">✈</div>
              <div>
                <div className="text-xl font-bold text-gray-900">C.H.I.R.A.G.</div>
                <div className="text-sm text-gray-600 tracking-wider">CONNECT</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Please login with mobile number</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile number
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91837683XXXX"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending OTP..." : "Get OTP"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button onClick={() => navigate("/signup")} className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
