/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/** Public Courses API types */
export interface PublicCourseLecturer {
  lecturer_name: string;
  lecturer_title: string;
  lecturer_department: string;
  role: "primary" | "support" | "coach";
}

export interface PublicCourse {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  course_code: string;
  duration: string; // e.g. "8 weeks"
  price: number;
  currency: string; // e.g. "LKR"
  created_at: string; // ISO timestamp
  students_count: number;
  lecturers: PublicCourseLecturer[];
}
