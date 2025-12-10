import { useState } from 'react';
import { CreditCard, Tag, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import bankTransferService from '../../services/bankTransferService';

interface PayHereCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseTitle: string;
  coursePrice: number;
  currency?: string;
  onProceedToPayment: (couponData: any) => void;
}

export default function PayHereCouponModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  coursePrice,
  currency = 'LKR',
  onProceedToPayment
}: PayHereCouponModalProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState<any>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const finalAmount = couponDiscount 
    ? couponDiscount.discount.discounted_amount 
    : coursePrice;

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;

    setIsValidatingCoupon(true);
    setError('');

    try {
      const result = await bankTransferService.validateCoupon(
        couponCode,
        courseId,
        coursePrice
      );

      if (result.valid) {
        setCouponDiscount(result);
      } else {
        setError('Invalid coupon code');
        setCouponDiscount(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to validate coupon');
      setCouponDiscount(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleProceed = () => {
    onProceedToPayment({
      amount: finalAmount,
      originalAmount: couponDiscount ? coursePrice : undefined,
      couponCode: couponDiscount ? couponCode : undefined,
      discountAmount: couponDiscount?.discount?.amount,
      discountPercentage: couponDiscount?.discount?.percentage,
      referredBy: couponDiscount?.referred_by?.id
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2d1b4e] border border-[#FFD700]/20 rounded-3xl shadow-2xl max-w-md w-full p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">PayHere Payment</h3>
          <p className="text-white/70 text-sm">{courseTitle}</p>
        </div>

        {/* Coupon Code Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#FFD700]" />
            Have a Coupon Code? (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white placeholder-white/40"
            />
            <button
              type="button"
              onClick={handleValidateCoupon}
              disabled={!couponCode.trim() || isValidatingCoupon}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:bg-purple-900/50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
            >
              {isValidatingCoupon ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </div>
          
          {/* Coupon Success */}
          {couponDiscount && (
            <div className="mt-3 p-3 bg-green-600/20 border border-green-500/30 rounded-xl flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-400 text-sm font-medium">
                  Coupon Applied Successfully!
                </p>
                <p className="text-green-300/80 text-xs mt-1">
                  {couponDiscount.message}
                </p>
              </div>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="mt-3 p-3 bg-red-600/20 border border-red-500/30 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Amount Display */}
        <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-5 mb-6">
          <div className="space-y-3">
            {couponDiscount && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Original Amount:</span>
                  <span className="line-through text-white/40 font-medium">
                    {bankTransferService.formatCurrency(coursePrice, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400 font-medium">
                    Discount ({couponDiscount.discount.percentage}%):
                  </span>
                  <span className="text-green-400 font-medium">
                    -{bankTransferService.formatCurrency(couponDiscount.discount.amount, currency)}
                  </span>
                </div>
                <div className="border-t border-purple-500/20 pt-3"></div>
              </>
            )}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg text-white">Amount to Pay:</span>
              <span className="font-bold text-3xl text-[#FFD700]">
                {bankTransferService.formatCurrency(finalAmount, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <CreditCard className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-300">
              <p className="font-medium mb-1">What happens next:</p>
              <ul className="space-y-1 text-blue-300/80">
                <li>• You'll be redirected to PayHere gateway</li>
                <li>• Complete payment securely</li>
                <li>• Get instant course access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFC700] hover:to-[#FF9500] text-black font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-[#FFD700]/50 flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            Proceed to Payment Gateway
          </button>
          
          <button
            onClick={onClose}
            className="w-full border-2 border-white/20 text-white/80 hover:bg-white/5 font-medium py-3 rounded-2xl transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}