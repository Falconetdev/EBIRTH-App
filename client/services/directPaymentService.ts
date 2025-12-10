import axios from 'axios';
import payHereService from './payHereService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface DirectPaymentData {
  courseId: number;
  courseTitle: string;
  coursePrice: number;
  currency: string;
}

class DirectPaymentService {
  
  // Initiate direct payment without pre-creating enrollment
  // The PayHere webhook will create enrollment when payment succeeds
  async initiateDirectPayment(paymentData: DirectPaymentData, user: any, couponData?: any) {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      // Get student ID from token
      const studentId = this.getStudentIdFromToken(token);
      
      if (!studentId) {
        throw new Error('Invalid authentication token. Please login again.');
      }

      console.log('Initiating payment for student:', studentId, 'course:', paymentData.courseId);

      // Generate order ID
      const orderId = payHereService.generateOrderId(paymentData.courseId, studentId);

      // Wait for PayHere to load
      await payHereService.waitForPayHere();

      // Prepare customer details
      const studentName = user?.name || user?.email?.split('@')[0] || 'Student';
      const studentEmail = user?.email || '';

      // Use coupon amount if available, otherwise use original price
      const paymentAmount = couponData?.amount || paymentData.coursePrice;

      // Initiate PayHere checkout
      const paymentResult = await payHereService.initiateCheckout({
        amount: paymentAmount,
        orderId: orderId,
        items: paymentData.courseTitle,
        courseId: paymentData.courseId,
        enrollmentId: 0, // Will be created by webhook
        customerName: studentName,
        customerEmail: studentEmail,
        currency: paymentData.currency || 'LKR',
        // Pass coupon data to be stored with payment
        couponCode: couponData?.couponCode,
        originalAmount: couponData?.originalAmount,
        discountAmount: couponData?.discountAmount,
        discountPercentage: couponData?.discountPercentage,
        referredBy: couponData?.referredBy
      });

      return {
        success: true,
        orderId: orderId,
        paymentResult
      };

    } catch (error: any) {
      console.error('Direct payment error:', error);
      throw error;
    }
  }

  // Create enrollment after successful payment (fallback when webhook fails)
  async createEnrollmentAfterPayment(courseId: number, orderId: string): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      console.log('Creating enrollment for course:', courseId, 'after payment:', orderId);

      const { data } = await axios.post(
        `${API_BASE_URL}/api/public-enrollment/create-after-payment`,
        {
          course_id: courseId,
          order_id: orderId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Create enrollment after payment error:', error);
      throw error;
    }
  }

  // Check if student is already enrolled
  async checkExistingEnrollment(courseId: number): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return null;
      }

      const studentId = this.getStudentIdFromToken(token);
      
      const { data } = await axios.get(
        `${API_BASE_URL}/api/enrollments/student/${studentId}/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch (error: any) {
      // 404 means not enrolled
      if (error.response?.status === 404) {
        return null;
      }
      
      console.error('Check enrollment error:', error);
      return null;
    }
  }

  // Verify payment status
  async verifyPayment(orderId: string): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.get(
        `${API_BASE_URL}/api/payments/verify/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Verify payment error:', error);
      throw error;
    }
  }

  // Client-side payment update (fallback)
  async updatePaymentStatus(orderId: string, status: string): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/payments/client-update`,
        {
          order_id: orderId,
          status: status,
          notes: 'Client-side update from Landing page'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Update payment status error:', error);
      throw error;
    }
  }

  // Helper: Extract student ID from JWT token
  private getStudentIdFromToken(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload); // Debug log
      return payload.id; // JWT uses 'id' not 'userId' (see authController.js line 31)
    } catch (error) {
      console.error('Token parse error:', error);
      throw new Error('Invalid token format');
    }
  }
}

export default new DirectPaymentService();