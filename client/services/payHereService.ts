import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// PayHere Integration Service for eBirth Landing Page
class PayHereService {
  private merchantId: string;
  private isProduction: boolean;
  private baseUrl: string;

  constructor() {
    this.merchantId = import.meta.env.VITE_PAYHERE_MERCHANT_ID || '';
    this.isProduction = import.meta.env.VITE_PAYHERE_MODE === 'production';
    this.baseUrl = this.isProduction
      ? 'https://www.payhere.lk'
      : 'https://sandbox.payhere.lk';
  }

  // Get payment hash from server (required since 2023-01-16)
  async getPaymentHash(paymentData: {
    orderId: string;
    amount: number;
    currency?: string;
  }): Promise<string> {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_BASE_URL}/api/payments/payhere/hash`,
        {
          order_id: paymentData.orderId,
          amount: paymentData.amount,
          currency: paymentData.currency || 'LKR'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return data.hash;
    } catch (error) {
      console.error('Error getting payment hash:', error);
      throw error;
    }
  }

  // Initialize PayHere checkout
  async initiateCheckout(paymentData: {
    amount: number;
    orderId: string;
    items: string;
    courseId: number;
    enrollmentId: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress?: string;
    customerCity?: string;
    currency?: string;
    // Coupon data (optional)
    couponCode?: string;
    originalAmount?: number;
    discountAmount?: number;
    discountPercentage?: number;
    referredBy?: number;
  }): Promise<{ status: string; orderId: string; message: string }> {
    try {
      // Validate required data
      if (!paymentData.amount || !paymentData.orderId || !paymentData.items) {
        throw new Error('Missing required payment data');
      }

      // Check if PayHere is loaded
      if (!window.payhere) {
        throw new Error('PayHere library not loaded');
      }

      // Get payment hash from server
      const hash = await this.getPaymentHash(paymentData);

      return new Promise((resolve, reject) => {
        // PayHere configuration according to official documentation
        const payment = {
          // Basic Configuration
          sandbox: !this.isProduction,
          merchant_id: this.merchantId,
          
          // URLs for hybrid approach
          return_url: `${window.location.origin}/payment-success`,
          cancel_url: `${window.location.origin}/payment-cancel`,
          notify_url: `${import.meta.env.VITE_WEBHOOK_BASE_URL || API_BASE_URL}/api/payments/payhere/webhook`,
          
          // Order Details
          order_id: paymentData.orderId,
          items: paymentData.items,
          amount: Number(paymentData.amount).toFixed(2),
          currency: paymentData.currency || 'LKR',
          hash: hash, // Required hash from server
          
          // Customer Details
          first_name: paymentData.customerName.split(' ')[0] || 'Student',
          last_name: paymentData.customerName.split(' ').slice(1).join(' ') || '',
          email: paymentData.customerEmail,
          phone: paymentData.customerPhone || '',
          address: paymentData.customerAddress || 'Colombo',
          city: paymentData.customerCity || 'Colombo',
          country: 'Sri Lanka',
          
          // Custom Fields for our tracking
          custom_1: paymentData.courseId.toString(),
          custom_2: paymentData.enrollmentId.toString(),
          // Store coupon data in remaining custom fields if available
          ...(paymentData.couponCode && {
            delivery_address: `COUPON:${paymentData.couponCode}`, // Use delivery_address to pass coupon code
            delivery_city: paymentData.originalAmount ? `ORIGINAL:${paymentData.originalAmount}` : ''
          })
        };

        console.log('PayHere payment configuration:', payment);

        // PayHere event handlers
        window.payhere.onCompleted = (orderId: string) => {
          console.log('PayHere payment completed:', orderId);
          resolve({
            status: 'completed',
            orderId: orderId,
            message: 'Payment completed successfully'
          });
        };

        window.payhere.onDismissed = () => {
          console.log('PayHere payment dismissed');
          reject({
            status: 'dismissed',
            message: 'Payment was cancelled by user'
          });
        };

        window.payhere.onError = (error: any) => {
          console.error('PayHere payment error:', error);
          reject({
            status: 'error',
            error: error,
            message: 'Payment failed due to an error'
          });
        };

        // Start checkout
        window.payhere.startPayment(payment);
      });

    } catch (error: any) {
      console.error('PayHere initialization error:', error);
      throw {
        status: 'initialization_error',
        error: error.message,
        message: 'Failed to initialize payment'
      };
    }
  }

  // Generate unique order ID
  generateOrderId(courseId: number, studentId: number): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `COURSE_${courseId}_${studentId}_${timestamp}_${random}`;
  }

  // Wait for PayHere script to be loaded
  async waitForPayHere(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Check if PayHere is already loaded
      if (window.payhere) {
        resolve(true);
        return;
      }

      // Wait for script to load with timeout
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds
      const interval = setInterval(() => {
        attempts++;
        if (window.payhere) {
          clearInterval(interval);
          resolve(true);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          reject(new Error('PayHere script load timeout'));
        }
      }, 100);
    });
  }

  // Check if PayHere is loaded
  isPayHereLoaded(): boolean {
    return typeof window !== 'undefined' && !!window.payhere;
  }

  // Format currency for display
  formatCurrency(amount: number, currency: string = 'LKR'): string {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  // Validate PayHere configuration
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!this.merchantId) {
      errors.push('PayHere Merchant ID not configured');
    }
    
    if (!import.meta.env.VITE_PAYHERE_MODE) {
      errors.push('PayHere mode (sandbox/production) not configured');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

// Extend Window interface for PayHere
declare global {
  interface Window {
    payhere: {
      startPayment: (payment: any) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: any) => void;
    };
  }
}

// Export singleton instance
export default new PayHereService();