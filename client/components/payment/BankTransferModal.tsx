import { useState, useRef } from 'react';
import bankTransferService from '../../services/bankTransferService';

interface BankTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseTitle: string;
  coursePrice: number;
  currency?: string;
  onSuccess: () => void;
}

export default function BankTransferModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  coursePrice,
  currency = 'LKR',
  onSuccess
}: BankTransferModalProps) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>('');
  const [bankReference, setBankReference] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const finalAmount = couponDiscount 
    ? couponDiscount.discount.discounted_amount 
    : coursePrice;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = bankTransferService.validateReceiptFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setReceiptFile(file);
    setError('');

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!receiptFile) {
      setError('Please upload a receipt image');
      return;
    }

    setIsSubmitting(true);

    try {
      await bankTransferService.submitBankTransfer({
        courseId,
        amount: finalAmount,
        receiptFile,
        bankReference: bankReference.trim() || undefined,
        couponCode: couponDiscount ? couponCode : undefined,
        referredBy: couponDiscount?.referred_by?.id,
        discountAmount: couponDiscount?.discount?.amount,
        discountPercentage: couponDiscount?.discount?.percentage,
        originalAmount: couponDiscount ? coursePrice : undefined
      });

      // Success
      onSuccess();
      handleClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReceiptFile(null);
    setReceiptPreview('');
    setBankReference('');
    setCouponCode('');
    setCouponDiscount(null);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-[#1a0b2e] border border-purple-500/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-purple-800/30 border-b border-purple-500/30 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-[#FFD700]">Bank Transfer Payment</h2>
              <p className="text-white/70 text-sm">{courseTitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/70 hover:text-white text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bank Details */}
          <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-semibold text-[#FFD700] mb-3">Bank Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Bank Name:</span>
                <span className="font-medium text-white">Bank of Ceylon</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Account Name:</span>
                <span className="font-medium text-white">eBirth Academy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Account Number:</span>
                <span className="font-medium text-white">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Branch:</span>
                <span className="font-medium text-white">Colombo</span>
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Coupon Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white placeholder-white/40"
              />
              <button
                type="button"
                onClick={handleValidateCoupon}
                disabled={!couponCode.trim() || isValidatingCoupon}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-900/50 disabled:cursor-not-allowed transition-colors"
              >
                {isValidatingCoupon ? 'Checking...' : 'Apply'}
              </button>
            </div>
            {couponDiscount && (
              <div className="mt-2 p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ {couponDiscount.message}
                </p>
              </div>
            )}
          </div>

          {/* Amount Display */}
          <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="space-y-2">
              {couponDiscount && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Original Amount:</span>
                    <span className="line-through text-white/40">
                      {bankTransferService.formatCurrency(coursePrice, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">
                      Discount:
                    </span>
                    <span className="text-green-400">
                      -{bankTransferService.formatCurrency(couponDiscount.discount.amount, currency)}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between pt-2 border-t border-purple-500/30">
                <span className="font-semibold text-lg text-white/90">Amount to Pay:</span>
                <span className="font-bold text-2xl text-[#FFD700]">
                  {bankTransferService.formatCurrency(finalAmount, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Bank Reference */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Bank Reference Number (Optional)
            </label>
            <input
              type="text"
              value={bankReference}
              onChange={(e) => setBankReference(e.target.value)}
              placeholder="e.g., TXN123456"
              className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-white placeholder-white/40"
            />
            <p className="text-xs text-white/50 mt-1">
              Enter the transaction reference number from your bank receipt
            </p>
          </div>

          {/* Receipt Upload */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Upload Bank Receipt <span className="text-red-400">*</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-500/30 bg-purple-600/5 rounded-lg p-6 text-center cursor-pointer hover:border-[#FFD700] hover:bg-purple-600/10 transition-colors"
            >
              {receiptPreview ? (
                <div className="space-y-3">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="max-h-40 mx-auto rounded-lg border border-purple-500/30"
                  />
                  <p className="text-sm text-white/70">{receiptFile?.name}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setReceiptFile(null);
                      setReceiptPreview('');
                    }}
                    className="text-red-400 text-sm hover:text-red-300 hover:underline transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg
                    className="mx-auto h-12 w-12 text-purple-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="text-sm text-white/70">
                    <span className="text-[#FFD700] font-medium">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-xs text-white/50">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
            <h4 className="font-medium text-[#FFD700] mb-2">Important Information</h4>
            <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
              <li>Transfer the exact amount shown above</li>
              <li>Upload a clear photo of your bank receipt</li>
              <li>Your payment will be reviewed within 24 hours</li>
              <li>You'll receive an email once approved and enrolled</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-purple-500/30 text-white/80 rounded-lg hover:bg-purple-600/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!receiptFile || isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC700] text-black rounded-lg hover:from-[#FFC700] hover:to-[#FFB700] disabled:from-purple-900/50 disabled:to-purple-800/50 disabled:cursor-not-allowed disabled:text-white/40 font-bold transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}