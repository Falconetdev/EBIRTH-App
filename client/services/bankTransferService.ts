import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface BankTransferData {
  courseId: number;
  amount: number;
  bankReference?: string;
  receiptFile: File;
  couponCode?: string;
  referredBy?: number;
  discountAmount?: number;
  discountPercentage?: number;
  originalAmount?: number;
}

class BankTransferService {
  
  // Submit bank transfer payment with receipt upload
  async submitBankTransfer(data: BankTransferData): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('course_id', data.courseId.toString());
      formData.append('amount', data.amount.toString());
      formData.append('payment_type', 'full');
      formData.append('receipt', data.receiptFile);
      
      if (data.bankReference) {
        formData.append('bank_reference', data.bankReference);
      }
      
      if (data.couponCode) {
        formData.append('coupon_code', data.couponCode);
      }
      
      if (data.referredBy) {
        formData.append('referred_by', data.referredBy.toString());
      }
      
      if (data.discountAmount) {
        formData.append('discount_amount', data.discountAmount.toString());
      }
      
      if (data.discountPercentage) {
        formData.append('discount_percentage', data.discountPercentage.toString());
      }
      
      if (data.originalAmount) {
        formData.append('original_amount', data.originalAmount.toString());
      }

      console.log('Submitting bank transfer payment for course:', data.courseId);

      const { data: response } = await axios.post(
        `${API_BASE_URL}/api/public-enrollment/bank-transfer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response;
    } catch (error: any) {
      console.error('Bank transfer submission error:', error);
      throw error;
    }
  }

  // Validate coupon code
  async validateCoupon(couponCode: string, courseId: number, amount: number): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/payments/validate-coupon`,
        {
          coupon_code: couponCode,
          course_id: courseId,
          amount: amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Coupon validation error:', error);
      throw error;
    }
  }

  // Format currency for display
  formatCurrency(amount: number, currency: string = 'LKR'): string {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  // Validate file type and size
  validateReceiptFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Please upload a valid image file (JPEG, PNG, or WebP)'
      };
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size must be less than 5MB'
      };
    }

    return { valid: true };
  }
}

export default new BankTransferService();