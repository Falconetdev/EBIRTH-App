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

export interface PublicCourseSyllabusContent {
  day_number: number;
  content_title: string;
  content_description: string;
  order_index: number;
}

export interface PublicCourseSubCourse {
  id: number;
  title: string;
  description: string;
  course_code: string;
  price: number;
  original_price: number | null;
  currency: string;
  duration: string;
  display_order: number;
}

export interface PublicCourse {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  course_code: string;
  duration: string; // e.g. "8 weeks"
  total_days: number | null; // Total days of the course
  delivery_mode: string; // "online" | "offline" | "hybrid"
  price: number;
  original_price: number | null; // Original price before discount
  currency: string; // e.g. "LKR"
  created_at: string; // ISO timestamp
  category: string | null; // Course category (e.g., "Programming", "Design")
  is_combo_course: boolean; // Whether this is a combo/bundle course
  students_count: number;
  lecturers: PublicCourseLecturer[];
  syllabus_total_days: number | null; // Total days in syllabus
  syllabus_content: PublicCourseSyllabusContent[]; // Course syllabus content
  sub_courses: PublicCourseSubCourse[] | null; // Sub-courses if this is a combo course
}
