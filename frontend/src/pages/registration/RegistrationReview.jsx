"use client"

const RegistrationReview = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Farm Illustration */}
          <div className="flex flex-col items-center justify-center">
            <div className="max-w-md mb-6">
              <img src="/images/registration-review.png" alt="Review Illustration" className="w-full h-auto" />
            </div>
          </div>

          {/* Right side - Review Message */}
          <div className="flex items-center justify-center">
            <div className="text-center space-y-8">
              {/* Review Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Review Message */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Your Application is under Review</h2>
                <p className="text-gray-600 max-w-md">
                  Chirag Connect will now Review your application. Expect your account to take two to three days.
                </p>
              </div>

              {/* Back to Dashboard */}
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-900 transition-colors font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationReview
