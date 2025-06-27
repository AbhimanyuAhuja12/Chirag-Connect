const Dashboard = ({ user }) => {
    const menuItems = [
      { icon: "🏠", label: "Home", active: true },
      { icon: "📝", label: "Registration" },
      { icon: "📅", label: "Bookings" },
      { icon: "📊", label: "Service History" },
      { icon: "📆", label: "Calendar" },
      { icon: "🏃", label: "Manage Runner" },
      { icon: "📈", label: "Reports" },
      { icon: "🚁", label: "Spray Assist" },
    ]
  
    const bottomMenuItems = [
      { icon: "📞", label: "Contact us" },
      { icon: "📄", label: "Terms and Conditions" },
      { icon: "🔒", label: "Privacy policy" },
      { icon: "🚪", label: "Logout" },
    ]
  
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
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
                  <a
                    href="#"
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                      item.active ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
  
          {/* Bottom Menu */}
          <div className="p-4 border-t border-gray-700">
            <ul className="space-y-2">
              {bottomMenuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <img src="/images/login-illustration.png" alt="Dashboard Illustration" className="w-full h-auto" />
              </div>
              <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900">
                Complete Your Profile by Registering
              </button>
            </div>
  
            {/* Dashboard Content Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Booking Requests</h3>
                <p className="text-gray-600">Manage your service bookings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">My Runners</h3>
                <p className="text-gray-600">Track your active runners</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Environmental Report</h3>
                <p className="text-gray-600">View sustainability metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Dashboard
  