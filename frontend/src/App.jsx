"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Login from "./components/Login"
import Signup from "./components/Signup"
import OTPVerification from "./components/OTPVerification"
import Success from "./components/Success"
import Dashboard from "./components/Dashboard"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [authFlow, setAuthFlow] = useState({
    type: null, // 'login' or 'signup'
    mobile: "",
    email: "",
    name: "",
    step: "initial", // 'initial', 'otp', 'success'
  })

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login authFlow={authFlow} setAuthFlow={setAuthFlow} />} />
          <Route path="/signup" element={<Signup authFlow={authFlow} setAuthFlow={setAuthFlow} />} />
          <Route
            path="/verify-otp"
            element={<OTPVerification authFlow={authFlow} setAuthFlow={setAuthFlow} setUser={setUser} />}
          />
          <Route path="/success" element={<Success authFlow={authFlow} setAuthFlow={setAuthFlow} />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        {/* <Dashboard/> */}
      </div>
    </Router>
  )
}

export default App
