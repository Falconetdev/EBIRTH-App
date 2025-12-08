import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface EnrollmentResponse {
  enrollment: {
    id: number;
    student_id: number;
    course_id: number;
    status: string;
    payment_status: string;
    enrolled_at: string;
  };
  message: string;
}

interface PaymentResponse {
  payment: {
    id: number;
    enrollment_id: number;
    student_id: number;
    course_id: number;
    amount: number;
    status: string;
    payment_method: string;
    payhere_order_id: string;
  };
  message: string;
}

class EnrollmentService {
  // Create enrollment for a course
  async createEnrollment(courseId: number): Promise<EnrollmentResponse> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/enrollments`,
        { 
          student_id: this.getStudentIdFromToken(token),
          course_id: courseId 
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
      console.error('Create enrollment error:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Session expired. Please login again.');
      }
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw new Error('Failed to create enrollment. Please try again.');
    }
  }

  // Get student's enrollments
  async getMyEnrollments(): Promise<any[]> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const studentId = this.getStudentIdFromToken(token);
      
      const { data } = await axios.get(
        `${API_BASE_URL}/api/enrollments/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return data;
    } catch (error: any) {
      console.error('Get enrollments error:', error);
      throw error;
    }
  }

  // Check if student is already enrolled in a course
  async checkEnrollment(courseId: number): Promise<any> {
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

  // Create payment record for PayHere
  async createPayment(paymentData: {
    enrollment_id: number;
    course_id: number;
    amount: number;
    payhere_payment_id: string;
    payhere_order_id: string;
  }): Promise<PaymentResponse> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const { data } = await axios.post(
        `${API_BASE_URL}/api/payments/payhere`,
        {
          ...paymentData,
          payment_type: 'full',
          payhere_response: {}
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
      console.error('Create payment error:', error);
      throw error;
    }
  }

  // Update payment status (client-side fallback)
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

  // Helper: Extract student ID from JWT token
  private getStudentIdFromToken(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
}

export default new EnrollmentService();