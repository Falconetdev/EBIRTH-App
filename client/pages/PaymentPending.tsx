import { useNavigate } from 'react-router-dom';

export default function PaymentPending() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <svg
              className="w-10 h-10 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Submitted!
          </h1>
          <p className="text-gray-600">
            Your bank transfer payment has been received
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Payment Under Review</h3>
                <p className="text-sm text-gray-600">
                  Our accounting team is reviewing your bank transfer receipt
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Approval (Within 24 Hours)</h3>
                <p className="text-sm text-gray-600">
                  You'll receive an email notification once your payment is approved
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Automatic Enrollment</h3>
                <p className="text-sm text-gray-600">
                  Once approved, you'll be automatically enrolled in the course
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm">
              <h4 className="font-semibold text-blue-900 mb-1">What happens next?</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• Check your email for payment confirmation</li>
                <li>• Once approved, you can access the course immediately</li>
                <li>• Contact support if you don't hear back within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/membership')}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 font-medium transition-all"
          >
            Browse More Courses
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium transition-all"
          >
            Back to Home
          </button>
        </div>

        {/* Support Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <a
              href="mailto:support@ebirth.lk"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}