"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import Layout from "./components/Layout"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import OTPVerification from "./pages/auth/OTPVerification"
import Success from "./pages/auth/Success"
import Dashboard from "./pages/Dashboard"
import RegistrationMain from "./pages/registration/RegistrationMain"
import ServiceVendorRegistration from "./pages/registration/ServiceVendorRegistration"
import SellerVendorRegistration from "./pages/registration/SellerVendorRegistration"
import DeliveryPartnerRegistration from "./pages/registration/DeliveryPartnerRegistration"
import RegistrationSuccess from "./pages/registration/RegistrationSuccess"
import RegistrationReview from "./pages/registration/RegistrationReview"
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [authFlow, setAuthFlow] = useState({
    type: null,
    mobile: "",
    email: "",
    name: "",
    step: "initial",
  })

  return (
    
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login authFlow={authFlow} setAuthFlow={setAuthFlow} />} />
          <Route path="/signup" element={<Signup authFlow={authFlow} setAuthFlow={setAuthFlow} />} />
          <Route
            path="/verify-otp"
            element={<OTPVerification authFlow={authFlow} setAuthFlow={setAuthFlow} setUser={setUser} />}
          />
          <Route path="/success" element={<Success authFlow={authFlow} setAuthFlow={setAuthFlow} />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <Layout user={user}>
                  <Dashboard user={user} />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Registration Routes */}
          <Route
            path="/registration"
            element={
              user ? (
                <Layout user={user}>
                  <RegistrationMain />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/registration/service-vendor"
            element={
              user ? (
                <Layout user={user}>
                  <ServiceVendorRegistration />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/registration/seller-vendor"
            element={
              user ? (
                <Layout user={user}>
                  <SellerVendorRegistration />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/registration/delivery-partner"
            element={
              user ? (
                <Layout user={user}>
                  <DeliveryPartnerRegistration />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/registration/success"
            element={
              user ? (
                <Layout user={user}>
                  <RegistrationSuccess />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/registration/review"
            element={
              user ? (
                <Layout user={user}>
                  <RegistrationReview />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
