import type { PublicCourse } from '@shared/api';

const PUBLIC_COURSES_ENDPOINT = 'https://ebirth-server-za5fc.ondigitalocean.app/api/courses/public';

export async function fetchPublicCourses(signal?: AbortSignal): Promise<PublicCourse[]> {
  const res = await fetch(PUBLIC_COURSES_ENDPOINT, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch courses (${res.status})`);
  }
  const data = await res.json();
  return data as PublicCourse[];
}
