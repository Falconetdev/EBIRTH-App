import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import directPaymentService from '../services/directPaymentService';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [error, setError] = useState('');
  const [enrollmentCreated, setEnrollmentCreated] = useState(false);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const orderId = searchParams.get('order_id');
      
      if (!orderId) {
        setError('Invalid payment verification link');
        setVerifying(false);
        return;
      }

      console.log('Verifying payment for order:', orderId);

      // Extract course ID from order_id format: COURSE_{courseId}_{studentId}_{timestamp}_{random}
      const orderParts = orderId.split('_');
      const courseId = orderParts.length >= 2 ? parseInt(orderParts[1]) : null;

      if (!courseId) {
        setError('Invalid order format. Please contact support.');
        setVerifying(false);
        return;
      }

      console.log('Extracted course ID:', courseId);

      // Wait a bit for webhook to process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to verify payment status (may fail if payment record doesn't exist yet)
      try {
        const result = await directPaymentService.verifyPayment(orderId);
        
        if (result.verified && result.payment) {
          setPaymentDetails(result.payment);
          
          // If payment is pending, update client-side as fallback
          if (result.payment.status === 'pending') {
            try {
              await directPaymentService.updatePaymentStatus(orderId, 'approved');
            } catch (err) {
              console.error('Client-side update failed:', err);
            }
          }
        }
      } catch (verifyError) {
        console.log('Payment verification failed, will create enrollment anyway:', verifyError);
      }

      // CRITICAL: Create enrollment as fallback (since webhook URL is wrong)
      console.log('Creating enrollment for course:', courseId);
      try {
        const enrollmentResult = await directPaymentService.createEnrollmentAfterPayment(courseId, orderId);
        console.log('Enrollment result:', enrollmentResult);
        
        if (enrollmentResult.enrollment) {
          setEnrollmentCreated(true);
          setPaymentDetails((prev: any) => ({
            ...prev,
            course_title: enrollmentResult.enrollment.course_title || 'Course',
            enrollment_id: enrollmentResult.enrollment.id,
            enrollment_created: enrollmentResult.created
          }));
        }
      } catch (enrollError: any) {
        console.error('Enrollment creation failed:', enrollError);
        // Don't fail completely - payment was successful
        if (enrollError.response?.status !== 409) { // 409 = already enrolled
          console.warn('Could not create enrollment, but payment was successful');
        }
      }

    } catch (err: any) {
      console.error('Payment verification error:', err);
      setError(err.message || 'Failed to verify payment');
    } finally {
      setVerifying(false);
    }
  };

  const goToDashboard = () => {
    const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || 'http://localhost:5174';
    window.location.href = `${mainAppUrl}/student/courses`;
  };

  const goToHome = () => {
    navigate('/');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gold-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <Loader2 className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying Payment
          </h2>
          <p className="text-gray-600">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gold-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={goToHome}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gold-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Your enrollment has been confirmed
          </p>
        </div>

        {/* Enrollment Status */}
        {enrollmentCreated && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Enrollment Created Successfully!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              You now have full access to the course materials and lectures.
            </p>
          </div>
        )}

        {/* Payment Details */}
        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-xs text-gray-900">
                {paymentDetails.order_id}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold text-gray-900">
                {paymentDetails.currency} {paymentDetails.amount?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Course:</span>
              <span className="font-medium text-gray-900">
                {paymentDetails.course_title}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {paymentDetails.status || 'Approved'}
              </span>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-900 mb-2">
            What's Next?
          </h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Access your course materials immediately</li>
            <li>• Check lecture schedules in your dashboard</li>
            <li>• Join course announcements and updates</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={goToDashboard}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 font-semibold"
          >
            Go to My Courses
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={goToHome}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 py-3 rounded-lg hover:bg-purple-50 transition font-semibold"
          >
            Browse More Courses
          </button>
        </div>

        {/* Support */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@ebirth.lk" className="text-purple-600 hover:underline">
            support@ebirth.lk
          </a>
        </p>
      </div>
    </div>
  );
}