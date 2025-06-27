"use client"

import { useLocation, useNavigate } from "react-router-dom"

const Sidebar = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { icon: "🏠", label: "Home", path: "/dashboard" },
    { icon: "📝", label: "Registration", path: "/registration" },
    { icon: "📅", label: "Bookings", path: "/bookings" },
    { icon: "📊", label: "Service History", path: "/service-history" },
    { icon: "📆", label: "Calendar", path: "/calendar" },
    { icon: "🏃", label: "Manage Runner", path: "/manage-runner" },
    { icon: "📈", label: "Reports", path: "/reports" },
    { icon: "🚁", label: "Spray Assist", path: "/spray-assist" },
  ]

  const bottomMenuItems = [
    { icon: "📞", label: "Contact us", path: "/contact" },
    { icon: "📄", label: "Terms and Conditions", path: "/terms" },
    { icon: "🔒", label: "Privacy policy", path: "/privacy" },
    { icon: "🚪", label: "Logout", path: "/logout" },
  ]

  const handleNavigation = (path) => {
    if (path === "/logout") {
      // Handle logout logic
      navigate("/login")
    } else {
      navigate(path)
    }
  }

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold">✈</div>
          <div>
            <div className="text-lg font-bold">C.H.I.R.A.G.</div>
            <div className="text-xs text-gray-300 tracking-wider">CONNECT</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-left ${
                  location.pathname === item.path
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-2">
          {bottomMenuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
