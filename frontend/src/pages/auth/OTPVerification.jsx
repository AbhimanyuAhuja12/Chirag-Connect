"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const OTPVerification = ({ authFlow, setAuthFlow, setUser }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const navigate = useNavigate()
  const inputRefs = useRef([])

  useEffect(() => {
    if (!authFlow.mobile || authFlow.step !== "otp") {
      navigate("/login")
    }
  }, [authFlow, navigate])

  const handleChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const otpString = otp.join("")
    if (otpString.length !== 4) {
      setError("Please enter complete OTP")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: authFlow.mobile,
          otp: otpString,
          type: authFlow.type,
          email: authFlow.email,
          name: authFlow.name,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthFlow({
          ...authFlow,
          step: "success",
        })
        setUser(data.user)
        navigate("/success")
      } else {
        setError(data.message || "Invalid OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: authFlow.mobile,
          type: authFlow.type,
          email: authFlow.email,
          name: authFlow.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to resend OTP")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setResendLoading(false)
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
          {/* Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter OTP</h2>
              <p className="text-sm text-gray-600 mb-2">
                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
              </p>
              <p className="text-sm text-gray-500 mb-2">******{authFlow.mobile.slice(-4)}</p>

              {/* Development Mode Hint */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Development Mode:</strong> Use OTP <strong>1234</strong> to continue
                </p>
                {authFlow.devOtp && <p className="text-xs text-yellow-600 mt-1">Generated OTP: {authFlow.devOtp}</p>}
              </div>

              <p className="text-sm text-gray-700 mb-6">Type your 4 digit security code</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ))}
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Submit"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">
                  Didn't get the code?{" "}
                  <button
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "Resend"}
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

export default OTPVerification
