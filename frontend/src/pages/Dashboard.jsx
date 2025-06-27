const Dashboard = ({ user }) => {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="max-w-md mx-auto mb-6">
              <img src="/images/registration-main.png" alt="Dashboard Illustration" className="w-full h-auto" />
            </div>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900">
              Complete Your Profile by Registering
            </button>
          </div>
  
          {/* Dashboard Content */}
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
    )
  }
  
  export default Dashboard
  