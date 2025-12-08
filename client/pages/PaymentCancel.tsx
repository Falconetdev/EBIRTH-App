import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToCourses = () => {
    navigate('/courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gold-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Cancel Icon */}
        <div className="text-center mb-6">
          <XCircle className="w-20 h-20 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600">
            Your payment was not completed
          </p>
        </div>

        {/* Information */}
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-orange-900 mb-2">
            What happened?
          </h3>
          <p className="text-sm text-orange-800">
            The payment process was cancelled or interrupted. Don't worry - no charges were made to your account.
          </p>
        </div>

        {/* Common Reasons */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Common reasons for cancellation:
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Payment window was closed</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Session timeout</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Incorrect payment details</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Network connection issues</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2">
            What can you do?
          </h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Try the payment again</li>
            <li>• Check your payment details</li>
            <li>• Contact support if you need help</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={goBack}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-semibold"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={goToCourses}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 py-3 rounded-lg hover:bg-purple-50 transition font-semibold"
          >
            Browse Other Courses
          </button>
          <button
            onClick={goToHome}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Home
          </button>
        </div>

        {/* Support */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-2">
            Need assistance?
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a 
              href="mailto:support@ebirth.lk" 
              className="text-purple-600 hover:underline font-medium"
            >
              Email Support
            </a>
            <span className="text-gray-300">|</span>
            <a 
              href="tel:+94112345678" 
              className="text-purple-600 hover:underline font-medium"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}